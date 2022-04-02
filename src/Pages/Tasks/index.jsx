import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataBase, TableNames } from "@/Configs/Firebase-config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NotFound, Spinner } from "@/Pages";
import { DescriptionBar } from "@/Components";
import {
  TasksItem,
  DeleteTaskModal,
  EditTaskModal,
  NewTaskModal,
} from "@/Components/Tasks";
import { useProvider } from "@/Configs/Provider";

export const Tasks = (props) => {
  const myProvider = useProvider();
  const params = useParams();
  const CategoryID = params.categoriaID;
  const [categoryData, setCategoryData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [exists, setExists] = useState(false);
  const [pending, setPending] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [newTask, setNewTask] = useState(null);

  useEffect(() => {
    var unsubscribeTask;
    const unsubscribeCategory = onSnapshot(
      doc(DataBase, TableNames.categories, CategoryID),
      (doc) => {
        if (doc.exists()) {
          setCategoryData({ id: doc.id, data: doc.data() });
          setExists(true);
          //
          const table = collection(DataBase, TableNames.tasks);
          const receivedTasks = query(
            table,
            where("userid", "==", myProvider.Auth.User.uid),
            where("categoryid", "==", CategoryID),
            orderBy("timestamp", "desc")
          );
          unsubscribeTask = onSnapshot(receivedTasks, (querySnapshot) => {
            const curTasks = [];
            querySnapshot.forEach((doc) => {
              curTasks.push({ id: doc.id, data: doc.data() });
            });
            setTasks(curTasks);
            setPending(false);
          });
          //
        } else {
          setPending(false);
        }
      }
    );

    return () => {
      unsubscribeCategory();
      unsubscribeTask();
    };
  }, []);

  function HandleEditModal(doc) {
    setEditTask(doc);
  }

  function HandleDeleteModal(doc) {
    setDeleteTask(doc);
  }

  function HandleNewModal(ex) {
    setNewTask(ex);
  }

  return (
    <>
      {pending && <Spinner />}
      {!pending && !exists && <NotFound name={CategoryID} type={"Categoria"} />}
      {!pending && exists && (
        <>
          {editTask && (
            <EditTaskModal data={editTask} exithandle={setEditTask} />
          )}
          {deleteTask && (
            <DeleteTaskModal data={deleteTask} exithandle={setDeleteTask} />
          )}
          {newTask && (
            <NewTaskModal categoryid={CategoryID} exithandle={setNewTask} />
          )}
          <DescriptionBar
            returnurl="/categorias"
            newfunction={() => HandleNewModal(true)}
          >
            {categoryData.data.name}
          </DescriptionBar>

          {tasks.map((doc, key) => (
            <TasksItem
              key={doc.id}
              item={doc}
              deleteModalRef={HandleDeleteModal}
              editmodalRef={HandleEditModal}
            />
          ))}
        </>
      )}
    </>
  );
};
