import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DataBase, TableNames } from "@/Configs/Firebase-config";

export const TasksItem = ({ item, editmodalRef, deleteModalRef }) => {
  const [TaskData, setTaskData] = useState(item || undefined);
  const [done, setDone] = useState(null);

  let docObserver;
  useEffect(() => {
    docObserver = onSnapshot(
      doc(DataBase, TableNames.tasks, item.id),
      (doc) => {
        setTaskData({ id: doc.id, data: doc.data() });
      }
    );
  }, []);

  useEffect(() => {
    if (window.location.pathname !== `/categorias/${item.data.categoryid}`) {
      docObserver();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    setDone(TaskData.data.done);
  }, [TaskData]);

  const updateStats = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    const curDoc = doc(DataBase, TableNames.tasks, item.id);

    const UpdatedDoc = {
      done: !done,
    };

    updateDoc(curDoc, UpdatedDoc);
  };

  const EditModalCallBack = () => {
    editmodalRef(TaskData);
  };

  const DeleteModalCallBack = () => {
    deleteModalRef(TaskData);
  };

  return (
    <CItem
      tabIndex={-1}
      onClick={(e) => updateStats(e)}
      className={done && "done"}
      key={item.id}
    >
      <LinkBundle onClick={(e) => updateStats(e)}>
        {TaskData.data.name}
      </LinkBundle>
      <IconsContainer>
        <Icons onClick={() => EditModalCallBack()} className="icons">
          edit
        </Icons>
        <Icons onClick={() => DeleteModalCallBack()} className="icons">
          delete_forever
        </Icons>
      </IconsContainer>
    </CItem>
  );
};

const CItem = styled.button`
  user-select: none;
  display: flex;
  flex-direction: row;
  border: 0.5px solid ${(props) => props.theme.colors.buttons};
  transition: all ease-in-out 500ms;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 5px;
  margin: 5px;
  background-color: ${(props) => props.theme.backgrounds.primary.minimal};
  border-radius: 0px;
  filter: brightness(0.8);
  cursor: pointer;
  transform: scale(0.95);

  &:hover {
    transform: scale(1);
    border-radius: 10px;
  }

  &:hover :nth-child(1) {
    transform: none;
  }

  &:hover :nth-child(1)::before {
    opacity: 1;
  }

  &.done {
    transform: scale(1);
    filter: brightness(1.4);
    border-radius: 10px;
    & :nth-child(1) {
      transform: none;
    }

    & :nth-child(1)::before {
      color: ${(props) => props.theme.colors.buttons};
      opacity: 1;
    }
  }
`;

const LinkBundle = styled.div`
  font-size: 20px;
  flex-grow: 1;
  color: ${(props) => props.theme.colors.primary};
  margin: 0 10px;
  transform: translateX(-0.75em);
  text-align: left;
  transition: transform 200ms;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &::before {
    content: "#";
    display: inline-block;
    width: 0.75em;
    color: ${(props) => props.theme.colors.secondary};
    opacity: 0;
    transition: opacity 200ms;
  }
`;

const IconsContainer = styled.div`
  padding: 0 10px;
  display: flex;
  height: max-content;
  grid-gap: 5px;
`;

const Icons = styled.i`
  transition: ease-in-out 250ms all;
  color: ${(props) => props.theme.colors.primary};
  text-shadow: 0 0 2px ${(props) => props.theme.colors.buttons};
  opacity: 0.5;

  &:hover {
    transition: all 250ms linear;
    opacity: 1;
    text-shadow: 0 0 5px ${(props) => props.theme.colors.buttons};
  }

  &:active {
    transition: all 200ms ease-in-out;
    color: ${(props) => props.theme.colors.buttons};
    text-shadow: 0 0 5px ${(props) => props.theme.colors.primary};
  }
`;
