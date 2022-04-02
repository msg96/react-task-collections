import React from "react";
import styled from "styled-components";
import { LoadSpinner } from "@/Components";

const Content = styled.div`
  transition: all 250ms ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = ({ clean }) => {
  return (
    <Container>
      <Guide>
        <LoadSpinner clean={clean} />
      </Guide>
    </Container>
  );
};

const Container = styled.div`
  transition: all 500ms ${(props) => props.theme.cubicbeyzer.heartbeat};
  position: relative;

  display: block;
  min-width: 100vw;
  margin: 0 auto;

  min-height: calc(100vh - 60px);
  overflow-y: none;
`;

const Guide = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: absolute;
  left: calc(calc(100% / 2) - 100px);
  bottom: calc(calc(100% / 2) - 100px);
`;
