import React from "react";
import styled from "styled-components";
import { UIchild } from "../../translators/TemplateToComponents";
import { TreeItem } from "./TreeItem";

interface props {
  templateChildren: UIchild[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TreeList: React.FC<props> = ({ templateChildren }) => {
  const renderChildren: any = (children: UIchild[]) => {
    if (!children?.length) {
      return null;
    }
    return children.map((mainChild) => {
      const TheComponent = mainChild.tagName as any;
      const props = mainChild.props || [];

      return (
        <TheComponent key={mainChild.id} {...props}>
          <TreeItem item={mainChild} />
          {renderChildren(mainChild.children)}
        </TheComponent>
      );
    });
  };

  return <Container>{renderChildren(templateChildren)}</Container>;
};

const Heading = styled.div`
  margin-left: 15px;
`;
