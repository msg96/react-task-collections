import styled from "styled-components";

export const AuthButton = (props) => {
  const beforeIcon = props.before || undefined;
  const afterIcon = props.after || undefined;
  const onClick = props.onClick || undefined;
  return (
    <Button onClick={onClick}>
      {beforeIcon ? <Icon>{beforeIcon}</Icon> : <Icon />}
      <Text>{props.children}</Text>
      {afterIcon ? <Icon>{afterIcon}</Icon> : <Icon />}
    </Button>
  );
};

const Button = styled.button`
  transition: all 350ms ease-in-out;
  position: relative;
  display: flex;
  font-size: 16px;
  font-family: roboto, sans-serif;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 5px 15px;
  color: ${(props) => props.theme.colors.buttons};
  background-color: ${(props) => props.theme.backgrounds.buttons.default};
  border: 1px solid ${(props) => props.theme.colors.logo};
  margin: 5px;
  grid-gap: 10px;
  border-radius: 999px;
  text-align: center;
  height: 40px;
  min-width: max-content;
  transform: scale(0.95);
  filter: saturate(0.6);
  user-select: none;

  &:hover {
    transform: scale(1);
    filter: saturate(1);
    text-decoration: underline;
    cursor: pointer;
    animation: effeX 2s infinite;
    @keyframes effeX {
      0%,
      1% {
        box-shadow: 0 0 1px ${(props) => props.theme.colors.logo};
      }
      50% {
        box-shadow: 0 0 15px ${(props) => props.theme.colors.logo};
      }
      100% {
        box-shadow: 0 0 1px ${(props) => props.theme.colors.logo};
      }
    }
  }
  &:hover .icons {
    text-decoration: none;
  }
`;

const Icon = styled.div`
  height: 80%;
  min-width: 20px;
  display: flex;
  filter: drop-shadow(0 0 2px hsla(0, 0%, 35%, 50%));
`;

const Text = styled.div`
  flex-grow: 1;
  text-align: center;
`;
