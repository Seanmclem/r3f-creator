import React from "react";
import styled from "styled-components";
import { useTemplateStore } from "../../stores/templateStore";
import { UIchild } from "../../translators/TemplateToComponents";

const loopChildren = (
  nodeAddress: string,
  mainTemplate: UIchild[],
  updateMainTemplate: (mainTemplate: UIchild[]) => void
) => {
  const nodeAddressArray = nodeAddress.split(".");
  nodeAddressArray.shift();
  const originalNodes = [...mainTemplate];
  middleChildren({
    nodes: originalNodes,
    originalNodes,
    nodeAddressArray,
    updateMainTemplate,
  });
};

interface MiddleChildren {
  nodes: UIchild[];
  originalNodes: UIchild[];
  nodeAddressArray: string[];
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
}

const middleChildren = ({
  nodes,
  originalNodes,
  nodeAddressArray,
  updateMainTemplate,
}: MiddleChildren) => {
  // const reducer = (accumulated: UIchild[], currentValue: UIchild) => previousValue + currentValue;

  // // 1 + 2 + 3 + 4
  // console.log(array1.reduce(reducer));

  // nodeAddressArray.

  nodes.forEach((uiChild, index) => {
    console.log({ uiChild });
    console.log({ index });
    const nodeAddressedPosition = nodeAddressArray[0];

    console.log({ nodeAddressArray: [...nodeAddressArray] });
    debugger;
    if (
      nodeAddressArray.length === 1 &&
      index === parseInt(nodeAddressedPosition)
    ) {
      console.log("Enf ov da line", uiChild.tagName);
      if (uiChild?.props?.color) {
        uiChild.props.color = "red";
        updateMainTemplate(originalNodes);
      }
      console.log({ originalNodes });
    } else {
      debugger;
      const nextNode = uiChild.children?.[parseInt(nodeAddressedPosition)];
      debugger;
      console.log(nodeAddressedPosition, nextNode);

      if (nextNode) {
        nodeAddressArray.shift();
        middleChildren({
          nodes: nextNode.children,
          originalNodes,
          nodeAddressArray,
          updateMainTemplate,
        });
      }
    }
  });
};

interface props {
  item: UIchild;
  nodeAddress: string;
}

export const TreeItemLabelBox: React.FC<props> = ({ item, nodeAddress }) => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );

  const handleClick = () => {
    loopChildren(nodeAddress, mainTemplate, updateMainTemplate);
    console.log({ nodeAddress });

    // console.log({ mainTemplate });
  };

  return (
    <Container onClick={handleClick}>
      {/* // onclick make red */}
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
