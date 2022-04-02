import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { TopBar } from "@/Components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 250ms linear;
`;
const ChildrenContainer = styled.div`
  position: relative;
`;

const InjectedTransition = createGlobalStyle`
  body{
    transition: background 250ms ease-in;
  }
`;

export const Base = ({ auth, ...props }) => {
  return (
    <Container>
      <TopBar auth={auth} />
      <ChildrenContainer>
        {props.children}
        <InjectedTransition />
        <Outlet />
      </ChildrenContainer>
    </Container>
  );
};
