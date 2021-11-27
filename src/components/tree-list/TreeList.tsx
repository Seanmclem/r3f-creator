import React from "react";
import styled from "styled-components";
import { UIchild } from "../../translators/TemplateToComponents";
import { TreeItemLabelBox } from "./TreeItem";
import { TreeListChildren } from "./TreeListChildren";

interface props {
  templateChildren: UIchild[];
}

export const TreeList: React.FC<props> = ({ templateChildren }) => {
  return (
    <Container>
      <TreeListChildren children={templateChildren} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
