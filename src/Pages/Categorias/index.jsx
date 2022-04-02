import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { DataBase, TableNames } from "@/Configs/Firebase-config";
import { useProvider } from "@/Configs/Provider";
import { DescriptionBar } from "@/Components";
import {
  CategoryItem,
  EditCategoryModal,
  DeleteCategoryModal,
  NewCategoryModal,
} from "@/Components/Category";

export const Categorias = (props) => {
  const myProvider = useProvider();
  const [editcategory, setEditCategory] = useState(null);
  const [deletecategory, setDeleteCategory] = useState(null);
  const [newcategory, setNewCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const table = collection(DataBase, TableNames.categories);
    const receivedCategorie = query(
      table,
      where("userid", "==", myProvider.Auth.User.uid),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(receivedCategorie, (querySnapshot) => {
      const curCategories = [];
      querySnapshot.forEach((doc) => {
        curCategories.push({ id: doc.id, data: doc.data() });
      });
      setCategories(curCategories);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function HandleEditModal(doc) {
    setEditCategory(doc);
  }
  function HandleDeleteModal(doc) {
    setDeleteCategory(doc);
  }
  function HandleNewModal(ex) {
    setNewCategory(ex);
  }

  return (
    <>
      {editcategory && (
        <EditCategoryModal data={editcategory} exithandle={setEditCategory} />
      )}
      {deletecategory && (
        <DeleteCategoryModal
          data={deletecategory}
          exithandle={setDeleteCategory}
        />
      )}
      {newcategory && <NewCategoryModal exithandle={setNewCategory} />}
      <DescriptionBar newfunction={() => HandleNewModal(true)}>
        Categorias
      </DescriptionBar>

      {categories.map((doc, key) => (
        <CategoryItem
          key={doc.id}
          item={doc}
          deleteModalRef={HandleDeleteModal}
          editmodalRef={HandleEditModal}
        />
      ))}
    </>
  );
};
