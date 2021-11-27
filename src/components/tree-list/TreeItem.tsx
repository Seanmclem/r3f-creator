import React from "react";
import styled from "styled-components";
import { UIchild } from "../../translators/TemplateToComponents";

interface props {
  item: UIchild;
  nodeAddress: string;
}

export const TreeItemLabel: React.FC<props> = ({ item, nodeAddress }) => {
  return (
    <Container onClick={() => console.log({ nerper: nodeAddress })}>
      {item.tagName}
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;
