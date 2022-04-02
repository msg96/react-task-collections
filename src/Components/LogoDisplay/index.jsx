import styled from "styled-components";
import { AppLogo } from "@/svgs";

const LogoContent = styled.section`
  animation: saturation 5s infinite;
  @keyframes saturation {
    0%,
    1% {
      filter: saturate(0.2);
    }
    50% {
      filter: saturate(2.2);
    }
    100% {
      filter: saturate(0.2);
    }
  }
`;

const Logo = styled.div`
  transition: all ease-in 1s;
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgrounds.logo.transparent};
  border: 2px solid ${(props) => props.theme.colors.logo};
  box-shadow: 0 0 20px ${(props) => props.theme.colors.logo};
  border-radius: 50%;

  animation: zooned 5s infinite;

  @keyframes zooned {
    0%,
    1% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const LogoDisplay = (props) => {
  const size = props.size || "130px";
  return (
    <div id="logoContainer" style={{ width: size, height: size }}>
      <LogoContent>
        <Logo id="logo">
          <AppLogo />
        </Logo>
      </LogoContent>
    </div>
  );
};
