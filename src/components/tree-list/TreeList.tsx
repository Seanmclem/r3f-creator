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
  const renderChildren: any = (children: UIchild[], parentName?: string) => {
    if (!children?.length) {
      return null;
    }
    return children.map((mainChild, index) => {
      // const TheComponent = mainChild.tagName as any;
      const nodeAddress =
        !parentName || !mainChild.tagName
          ? `root`
          : `${parentName}.[${index}]${mainChild.tagName}`;

      return (
        <PrimitivesList
          key={mainChild.id}
          data-derp={!parentName || !mainChild.tagName ? `root` : nodeAddress}
        >
          <TreeItem item={mainChild} />
          {renderChildren(mainChild.children, nodeAddress)}
        </PrimitivesList>
      );
    });
  };

  return <Container>{renderChildren(templateChildren)}</Container>;
};

const PrimitivesList = styled.div`
  margin-left: 15px;
`;
