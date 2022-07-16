import React from "react";
import styled from "styled-components";
import { Spacer } from "../../pages/_OLD_AstTools";

interface props {}

export const TopBar: React.FC<props> = () => {
  return (
    <Container>
      <Spacer />
      <Button>Export</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 35px;
  width: 100%;
  background-color: red;
`;

const Button = styled.button`
  margin-top: 5px;
  margin-bottom: 5px;
`;
