import styled from "styled-components/macro";
import { UIchild } from "../../translators/TemplateToComponents";
import { TreeItemLabelBox } from "./TreeItem";
import { AddNew, TreeItem } from "./TreeItemStyled";

const AddNewButton: React.FC<{ mainChild: UIchild }> = ({ mainChild }) => {
  return mainChild.tagName === "Fragment" ? (
    <PrimitivesList>
      <AddNew onClick={() => null} selected={false}>
        Add Component
      </AddNew>
    </PrimitivesList>
  ) : null;
};

interface props {
  children: UIchild[];
  parentName?: string;
}

export const TreeListChildren: React.FC<props> = ({ children, parentName }) => {
  if (!children?.length) {
    return null;
  }
  return (
    <>
      {children.map((mainChild, index) => {
        // const TheComponent = mainChild.tagName as any;
        const nodeAddress =
          !parentName || !mainChild.tagName ? `0` : `${parentName}.${index}`;
        // console.log({ nodeAddress });
        return (
          <PrimitivesList key={mainChild.id}>
            <TreeItemLabelBox item={mainChild} nodeAddress={nodeAddress} />
            <TreeListChildren
              children={mainChild.children}
              parentName={nodeAddress}
            />
            <AddNewButton mainChild={mainChild} />
          </PrimitivesList>
        );
      })}
    </>
  );
};

const PrimitivesList = styled.div`
  margin-left: 15px;
`;
