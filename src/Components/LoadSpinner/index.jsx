import React from "react";
import styled from "styled-components";
import { LogoDisplay } from "../LogoDisplay";

const Guide = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: -1;
`;

const Spinner = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  border: 5px solid ${(props) => props.theme.backgrounds.primary.minimal};
  border-top-color: ${(props) => props.theme.colors.logo};
  animation: girar1 infinite linear ${(props) => props.theme.delays.spinn};
  backdrop-filter: blur(9px);

  @keyframes girar1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Logo = styled.div`
  animation: girar1 infinite linear reverse
    ${(props) => props.theme.delays.spinn};

  animation: scalled infinite linear reverse 4s;
  @keyframes scalled {
    0% {
      transform: rotate(0deg);

      filter: brightness(0.5);
    }
    50% {
      filter: brightness(1);
    }
    100% {
      transform: rotate(360deg);
      filter: brightness(0.5);
    }
  }
`;

const Displayer = styled.div`
  position: relative;
  user-select: none;
  text-align: center;
  padding: 5px;
  font-weight: 600;
  font-size: x-large;
  letter-spacing: 5px;
  animation: scalled infinite linear reverse 2s;
  text-shadow: 0 0 2px ${(props) => props.theme.backgrounds.primary.minimal};
  color: ${(props) => props.theme.colors.logo};

  animation: saturated infinite cubic-bezier(0.5, 0, 0.5, 1) 2s;

  @keyframes saturated {
    0% {
      filter: brightness(0.5);
    }
    50% {
      filter: brightness(1.5);
    }
    100% {
      filter: brightness(0.5);
    }
  }
`;

export const LoadSpinner = ({ clean }) => {
  return (
    <Guide>
      <Spinner>
        <Logo>
          <LogoDisplay size="100px" />
        </Logo>
      </Spinner>
      {!clean && <Displayer>Loading</Displayer>}
    </Guide>
  );
};
