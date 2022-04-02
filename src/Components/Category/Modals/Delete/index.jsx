import { deleteDoc, doc } from "firebase/firestore";
import { DataBase, TableNames } from "@/Configs/Firebase-config";
import { useProvider } from "@/Configs/Provider";
import { useState } from "react";
import styled from "styled-components";

export const DeleteCategoryModal = ({ data, exithandle }) => {
  const myProvider = useProvider();
  const [busy, setBusy] = useState(null);

  function ExitFunc(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    exithandle(false);
  }

  async function DeleteFunc(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    setBusy(true);
    deleteDoc(doc(DataBase, TableNames.categories, data.id)).then(() => {
      setBusy(null);
      exithandle(false);
    });
  }

  return (
    <DropShadow onClick={(e) => ExitFunc(e)}>
      <Modal action={null} onClick={(e) => e.preventDefault()}>
        <Title>Deletar Categoria</Title>
        <ModalContent>
          <Txt>
            Deseja deletar a categoria <TxtEffect>{data.data.name}</TxtEffect>?
          </Txt>
        </ModalContent>
        <Opts>
          <Buttons type="reset" onClick={(e) => ExitFunc(e)}>
            Cancelar
          </Buttons>
          <Buttons
            disabled={busy && true}
            type="submit"
            onClick={(e) => DeleteFunc(e)}
          >
            Deletar
          </Buttons>
        </Opts>
      </Modal>
    </DropShadow>
  );
};

const DropShadow = styled.div`
  position: absolute;
  transition: all 250ms ease-in;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  background-color: ${(props) => props.theme.backgrounds.primary.dropped};
`;

const Modal = styled.form`
  transition: all 250ms ease-in;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  background-color: ${(props) => props.theme.backgrounds.primary.transparent};
  border: 1px solid ${(props) => props.theme.colors.buttons};
  box-shadow: 0px 0px 15px ${(props) => props.theme.colors.buttons};
  border-radius: 10px;
  padding: 10px;
  grid-gap: 5px;
  animation-delay: 100ms;
  animation: formodaledit 1s ease-out;

  @keyframes formodaledit {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: x-large;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.secondary};
  text-shadow: 0 0 2px ${(props) => props.theme.colors.buttons};
`;

const Opts = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
`;

const Buttons = styled.button`
  transition: all 250ms ease-in;
  cursor: pointer;
  width: 90px;
  text-align: center;
  height: 30px;
  font-size: 14px;
  padding: 5px 10px;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.buttons};
  filter: brightness(1.5) grayscale(0.7);
  transform: perspective(2deg);
  color: ${(props) => props.theme.colors.primary};
  background-color: transparent;

  &:hover {
    filter: brightness(1.5)
      drop-shadow(0px 0px 15px ${(props) => props.theme.colors.buttons});
    border-radius: 5px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 15px 0;
`;

const Txt = styled.div`
  display: flex;
  grid-gap: 3px;
  flex-direction: row;
`;
const TxtEffect = styled.div`
  display: inline-flex;
  font-weight: 600;
  text-shadow: 0 0 3px ${(props) => props.theme.colors.logo};
  filter: brightness(1.5);
`;
