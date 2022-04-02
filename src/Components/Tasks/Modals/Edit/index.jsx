import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { DataBase, TableNames } from "@/Configs/Firebase-config";
import { useProvider } from "@/Configs/Provider";
import styled from "styled-components";

export const EditTaskModal = ({ data, exithandle }) => {
  const myProvider = useProvider();
  const [message, setMessage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    setBusy(true);
    window.setTimeout(() => {
      setMessage(null);
      setBusy(null);
    }, [3000]);
  }, [message]);

  function handledMessage(message) {
    setMessage(message);
  }

  function ExitFunc(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    exithandle(false);
  }

  async function UpdateFunc(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    setBusy(true);
    if (inputText === "") {
      handledMessage("Defina um nome de pelomenos 1 caracter para sua Task!.");
      setBusy(null);
      return;
    }
    if (inputText === data.data.name) {
      handledMessage("O novo nome da Task não pode ser o antigo!.");
      setBusy(null);
      return;
    }

    const Checker = query(
      collection(DataBase, TableNames.tasks),
      where("name", "==", inputText),
      where("userid", "==", myProvider.Auth.User.uid),
      where("categoryid", "==", data.data.categoryid)
    );

    const checkedDocks = await getDocs(Checker);
    if (checkedDocks.empty) {
      const curDoc = doc(DataBase, TableNames.tasks, data.id);
      const UpdatedDoc = {
        name: inputText,
      };
      updateDoc(curDoc, UpdatedDoc);
      setBusy(null);
      exithandle(false);
    } else {
      handledMessage("Task já existente");
      setBusy(null);
    }
  }

  return (
    <DropShadow onClick={(e) => ExitFunc(e)}>
      <Modal action={null} onClick={(e) => e.preventDefault()}>
        <Title>Editar Task</Title>
        <ModalContent>
          <Erro>{message || " "}</Erro>
          <InputText
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
            placeholder={data.data.name}
          />
        </ModalContent>
        <Opts>
          <Buttons type="reset" onClick={(e) => ExitFunc(e)}>
            Cancelar
          </Buttons>
          <Buttons
            type="submit"
            disabled={busy && true}
            onClick={(e) => UpdateFunc(e)}
          >
            Editar
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
  grid-gap: 10px;
  width: 100%;
  padding: 15px 0;
`;

const InputText = styled.input`
  width: 80%;
  appearance: none;
  border: 0px none transparent;
  height: auto;
  font-size: 20px;
  padding: 5px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.primary};
  text-shadow: 0 0 2px ${(props) => props.theme.colors.logo};
  background-color: ${(props) => props.theme.backgrounds.primary.minimal};
  text-indent: 5px;
  &::placeholder {
    color: ${(props) => props.theme.colors.secondary};
    text-shadow: 0 0 1px ${(props) => props.theme.colors.logo};
    opacity: 0.7;
  }

  &:focus {
    box-shadow: 0px 0px 3px ${(props) => props.theme.colors.buttons};
  }
`;

const Erro = styled.div`
  width: 80%;
  font-size: small;
  text-align: center;
  font-weight: 500;
  color: ${(props) => props.theme.colors.secondary};
  opacity: 0.5;
`;
