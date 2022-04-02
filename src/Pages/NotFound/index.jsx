import styled from "styled-components";
import { LogoDisplay, Link } from "@/Components";

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 50px;
`;
const Guide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  animation: Xcs forwards 1s;
  @keyframes Xcs {
    0% {
      transform: scale(0);
    }
    1% {
      transform: scale(0.001);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Logo = styled.div`
  padding: 0 0 40px 0;
`;
const Title = styled.div`
  text-align: center;
  font-weight: 600;
  font-family: roboto;
  font-size: xx-large;
  opacity: 0.5;
`;
const Text = styled.div`
  transition: all 200ms ease-in;

  text-decoration: 1px underline ${(props) => props.theme.colors.buttons};
  border: 1px solid ${(props) => props.theme.colors.buttons};
  font-weight: 500;
  font-family: roboto;
  font-size: x-large;
  padding: 5px 15px;
  margin: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.backgrounds.logo.transparent};
`;

export const NotFound = ({ name, type }) => {
  return (
    <Container>
      <Guide>
        <Logo>
          <LogoDisplay size="200px" />
        </Logo>
        <Title>
          {!type && "Página"}
          {type && type} não encontrada
        </Title>
        <Text>
          {name && name}
          {!name && window.location.pathname.slice(1)}
        </Text>
        <Link to={"/"} replace>
          Home
        </Link>
      </Guide>
    </Container>
  );
};
