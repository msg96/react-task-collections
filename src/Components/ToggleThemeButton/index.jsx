import styled from "styled-components";

export const ToggleThemeButton = styled.button`
  transition: all 1s ease-in-out;
  position: relative;
  background-color: ${(props) => props.theme.colors.logo};
  border: 1px solid ${(props) => props.theme.colors.logo};
  width: 50px;
  height: 25px;
  border-radius: 15px;
  margin: 10px -5px 10px 10px;
  font-size: 0;
  transform: rotate(90deg);

  &.dark {
    border: 1px solid ${(props) => props.theme.colors.logo};
  }

  &::before {
    transition: all 1s ease-in-out;
    position: absolute;
    top: 0;
    content: "";
    background-color: ${(props) => props.theme.backgrounds.primary.transparent};
    border: 2px solid ${(props) => props.theme.colors.logo};
    width: 70%;
    height: calc(100% - 4px);
    border-radius: 15px;
    animation: cds infinite linear 5s;

    @keyframes cds {
      0% {
        filter: saturate(0);
      }
      50% {
        filter: saturate(2);
      }
      100% {
        filter: saturate(0);
      }
    }
  }

  &:not(.dark)::before {
    left: 0;
  }

  &.dark::before {
    right: 0;
  }
`;
