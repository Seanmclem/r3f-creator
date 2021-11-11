import React from "react";
import styled from "styled-components";
import { UIchild } from "../../translators/TemplateToComponents";

interface props {
  item: UIchild;
}

export const TreeItem: React.FC<props> = ({ item }) => {
  return <Container>{item.tagName}</Container>;
};

const Container = styled.div`
  margin: 5px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;
