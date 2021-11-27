import styled from "styled-components/macro";
import { UIchild } from "../../translators/TemplateToComponents";
import { TreeItemLabel } from "./TreeItem";

interface props {
  children: UIchild[];
  parentName?: string;
}

export const TreeListChildren: React.FC<props> = ({ children, parentName }) => {
  debugger;
  if (!children?.length) {
    return null;
  }
  return (
    <>
      {children.map((mainChild, index) => {
        // const TheComponent = mainChild.tagName as any;
        const nodeAddress =
          !parentName || !mainChild.tagName
            ? `root`
            : `${parentName}.[${index}]${mainChild.tagName}`;
        console.log({ nodeAddress });
        return (
          <PrimitivesList
            key={mainChild.id}
            data-derp={!parentName || !mainChild.tagName ? `root` : nodeAddress}
          >
            <TreeItemLabel item={mainChild} />
            <TreeListChildren
              children={mainChild.children}
              parentName={nodeAddress}
            />
          </PrimitivesList>
        );
      })}
    </>
  );
};

const PrimitivesList = styled.div`
  margin-left: 15px;
`;
