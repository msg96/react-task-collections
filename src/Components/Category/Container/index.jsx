import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const CategoryContainer = ({ children, ...props }) => {
  return (
    <JustEffect>
      <Container>
        <Guide>
          <Outlet />
        </Guide>
      </Container>
    </JustEffect>
  );
};

const JustEffect = styled.div`
  display: flex;

  animation: JustEffect ease-in 1s;
  @keyframes JustEffect {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  transition: all 250ms ease-in;
  background-color: ${(props) => props.theme.backgrounds.primary.transparent};
  position: relative;
  display: block;
  max-width: 550px;
  min-width: 550px;
  margin: 5px auto;
  padding: 10px;
  border-radius: 5px;

  min-height: calc(100vh - 70px);
  max-height: calc(100vh - 70px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    background-color: ${(props) => props.theme.backgrounds.primary.default};
    opacity: 0.3;
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    background-color: ${(props) => props.theme.colors.buttons};
    border: 5px solid ${(props) => props.theme.backgrounds.primary.default};
    border-radius: 999px;
  }

  @media (max-width: 650px) {
    max-width: calc(100% - 10px);
    min-width: calc(100% - 10px);
    margin: 5px auto;
    min-height: calc(100vh - 70px);
    max-height: calc(100vh - 70px);
  }
`;

const Guide = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 0;
`;
