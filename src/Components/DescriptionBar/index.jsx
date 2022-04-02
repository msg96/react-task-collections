import { Link } from "../Link";
import styled from "styled-components";

export const DescriptionBar = ({ returnurl, newfunction, children }) => {
  return (
    <Container>
      <Title>{children}</Title>
      {returnurl && <Icon to={returnurl}>arrow_back</Icon>}
      {newfunction && (
        <RoundBtn onClick={newfunction} className="icons">
          add
        </RoundBtn>
      )}
    </Container>
  );
};

const Container = styled.div`
  transition: all 250ms ease-in;
  position: relative;
  background-color: ${(props) => props.theme.backgrounds.primary.transparent2};
  box-shadow: 0 0 2px ${(props) => props.theme.colors.buttons};
  height: 40px;
  padding: 10px;
  margin: 10px 0.5%;
  width: 99%;
  border-radius: 999px;
  animation: toDisplayDescriptionBar 1s ease-in;

  @keyframes toDisplayDescriptionBar {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Title = styled.div`
  font-size: larger;
  text-shadow: 0 0 2px ${(props) => props.theme.colors.buttons};

  font-weight: 500;
  text-align: center;
`;

const Icon = styled(Link)`
  position: absolute;
  bottom: calc(50% - 15px);
  color: ${(props) => props.theme.colors.buttons};
  left: 10;
  font-size: 30px;
  font-family: "Material Icons";
`;

const RoundBtn = styled.button`
  transition: ease-in-out 250ms all;
  position: absolute;
  background-color: ${(props) => props.theme.backgrounds.primary.dropped};
  cursor: pointer;
  right: 10px;
  bottom: calc(50% - 15px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.buttons};
  color: ${(props) => props.theme.colors.primary};
  text-shadow: 0 0 2px ${(props) => props.theme.colors.buttons};
  transform: scale(0.9);
  animation-delay: 500ms;

  &:hover {
    transition: all 250ms linear;
    transform: scale(1);
    color: ${(props) => props.theme.colors.buttons};
    box-shadow: 0 0 5px ${(props) => props.theme.colors.buttons};
    border: 1px solid ${(props) => props.theme.colors.buttons};
    text-shadow: 0 0 5px ${(props) => props.theme.colors.buttons};
  }

  &:active {
    transition: all 200ms ease-in-out;
    color: ${(props) => props.theme.colors.buttons};
    box-shadow: 0 0 15px ${(props) => props.theme.colors.buttons};
    text-shadow: 0 0 5px ${(props) => props.theme.colors.buttons};
  }
`;
