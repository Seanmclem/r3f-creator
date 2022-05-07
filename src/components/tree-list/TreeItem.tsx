import React from "react";
import styled from "styled-components";
import { useTemplateStore } from "../../stores/templateStore";
import { UIchild } from "../../translators/TemplateToComponents";

const loopChildren = (
  nodeAddress: string,
  mainTemplate: UIchild[],
  updateMainTemplate: (mainTemplate: UIchild[]) => void // save state
) => {
  const { nodeAddressArray, originalNodes } = getNodesBreakdown({
    nodeAddress,
    mainTemplate,
  });
  findAndUpdateNode({
    nodes: originalNodes,
    originalNodes,
    nodeAddressArray,
    updateMainTemplate,
  });
};

/* #region Borked improvements turned out same as original  */
// const traverseDepth = ({
//   originalNodes,
//   childNodes,
//   nodeAddressArray,
// }: {
//   originalNodes: UIchild[];
//   childNodes: UIchild[];
//   nodeAddressArray: string[];
// }) => {
//   console.log({ originalNodes, childNodes, nodeAddressArray });
//   const arrayIndexOfCurrentUIChild = nodeAddressArray?.[0]
//     ? parseInt(nodeAddressArray[0])
//     : undefined;

//   const hasReachedLastAddress = nodeAddressArray.length === 1;

//   if (hasReachedLastAddress && arrayIndexOfCurrentUIChild) {
//     const finalSelectedNode = childNodes[arrayIndexOfCurrentUIChild];
//   } else {
//     const nextNode = uiChild.children?.[currentNodeDepth];

//     traverseDepth({
//       originalNodes,
//       childNodes: originalNodes.children,
//       nodeAddressArray,
//     });
//   }
//   // nodeAddressArray.shift();

//   console.log({ arrayIndexOfCurrentUIChild });
//   // const currentNodeDepth = parseInt(nodeAddressedPosition);

//   // const hasReachedSelectedNode = nodeAddressArray.length === 1;

//   // if(!hasReachedSelectedNode){

//   // }

//   // const last = childNodes[currentNodeDepth]
// };
/* #endregion */

const getNodesBreakdown = ({
  nodeAddress,
  mainTemplate,
}: {
  nodeAddress: string;
  mainTemplate: UIchild[];
}) => {
  const nodeAddressArray = nodeAddress.split(".");
  // nodeAddressArray.shift();
  const originalNodes = [...mainTemplate];

  return { nodeAddressArray, originalNodes };
};

interface FindAndUpdateNode {
  nodes: UIchild[];
  originalNodes: UIchild[];
  nodeAddressArray: string[];
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
}

const findAndUpdateNode = ({
  nodes,
  originalNodes,
  nodeAddressArray,
  updateMainTemplate,
}: FindAndUpdateNode) => {
  // const reducer = (accumulated: UIchild[], currentValue: UIchild) => previousValue + currentValue;

  // // 1 + 2 + 3 + 4
  // console.log(array1.reduce(reducer));

  // nodeAddressArray.

  nodes.forEach((uiChild, index) => {
    const nodeAddressedPosition = nodeAddressArray[0];
    const currentNodeDepth = parseInt(nodeAddressedPosition);

    const hasReachedSelectedNode = nodeAddressArray.length === 1;

    if (hasReachedSelectedNode && index === currentNodeDepth) {
      console.log("Reached Selected Node:", uiChild.tagName);
      if (uiChild?.props?.color) {
        uiChild.props.color = "red"; // do changes... Need to pass these in too
        // ^ mutating the originalNodes, copied off mainTemplate
        updateMainTemplate(originalNodes);
      }
      console.log({ originalNodes });
    } else {
      nodeAddressArray.shift();

      const nextNodeAddressedPosition = nodeAddressArray[0];
      const nectNodeDepth = parseInt(nextNodeAddressedPosition);

      const nextNode = uiChild.children?.[nectNodeDepth];

      if (nextNode) {
        // ^takes first/current-item off the list,
        // before looping again, because it accesses the first one every time

        if (nodeAddressArray) {
          findAndUpdateNode({
            nodes: nextNode.children,
            originalNodes,
            nodeAddressArray,
            updateMainTemplate,
          });
        }
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
    // ^ my weird hacky loop function to make prop updates

    // save selectedNode to store
    // open new sidebar in-reaction
    // display selected node's prop(s)
    // save edits, on button click.
    //    use rewrite of loopChildren()?

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
