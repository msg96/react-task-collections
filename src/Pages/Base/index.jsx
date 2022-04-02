import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
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

export const Base = ({ auth, ...props }) => {
  return (
    <Container>
      <TopBar auth={auth} />
      <ChildrenContainer>
        {props.children}
        <Outlet />
      </ChildrenContainer>
    </Container>
  );
};
