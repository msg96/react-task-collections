import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DataBase, TableNames } from "@/Configs/Firebase-config";

export const CategoryItem = ({ item, editmodalRef, deleteModalRef }) => {
  const [CategoryData, setCategoryData] = useState(item || undefined);
  const NavigateMe = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(DataBase, TableNames.categories, item.id),
      (doc) => {
        setCategoryData({ id: doc.id, data: doc.data() });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  function NavigateToCategorie(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    NavigateMe(`/categorias/${item.id}`);
  }

  const EditModalCallBack = () => {
    editmodalRef(CategoryData);
  };

  const DeleteModalCallBack = () => {
    deleteModalRef(CategoryData);
  };

  return (
    <CItem tabIndex={-1} onClick={(e) => NavigateToCategorie(e)} key={item.id}>
      <LinkBundle onClick={(e) => NavigateToCategorie(e)}>
        {CategoryData.data.name}
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
  border-radius: 10px;
  filter: brightness(0.8);
  cursor: pointer;
  transform: scale(0.99);

  &:hover {
    transform: scale(1);
  }

  &:hover :nth-child(1) {
    transform: none;
  }

  &:hover :nth-child(1)::before {
    opacity: 1;
  }
`;

const LinkBundle = styled.div`
  font-size: 20px;
  flex-grow: 1;
  color: ${(props) => props.theme.colors.primary};
  margin: 0 10px;
  padding: 0 10px;
  transform: translateX(-0.75em);
  text-align: left;
  transition: transform 200ms;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
