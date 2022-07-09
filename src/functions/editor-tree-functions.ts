import { UIchild } from "../translators/TemplateToComponents";

export interface SendNodeUpdate {
  /** String path to node. Example `"0.3.1.0"` */
  nodeAddress: string;
  /** Zustand store value for global template */
  mainTemplate: UIchild[];
  /** Zustand store update function */
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
  /** Update payload */
  update: any;
}

export const sendNodeUpdate = ({
  nodeAddress,
  mainTemplate,
  updateMainTemplate,
  update,
}: SendNodeUpdate) => {
  const { nodeAddressSplitArray, mainTemplateCopy } = getNodesBreakdown({
    nodeAddress,
    mainTemplate,
  });
  findAndUpdateNode({
    nodes: mainTemplateCopy,
    originalNodes: mainTemplateCopy,
    nodeAddressSplitArray,
    updateMainTemplate,
    updateToDo: update,
  });
};

export interface NodesBreakdown {
  nodeAddressSplitArray: string[];
  mainTemplateCopy: UIchild[];
}

export const getNodesBreakdown = ({
  nodeAddress,
  mainTemplate,
}: {
  nodeAddress: string;
  mainTemplate: UIchild[];
}): NodesBreakdown => {
  const nodeAddressSplitArray = nodeAddress.split(".");
  // nodeAddressSplitArray.shift();
  const mainTemplateCopy = [...mainTemplate];

  return { nodeAddressSplitArray, mainTemplateCopy };
};

export interface FindAndUpdateNode {
  nodes: UIchild[];
  originalNodes: UIchild[];
  nodeAddressSplitArray: string[];
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
  updateToDo: any;
}

export const findAndUpdateNode = ({
  nodes,
  originalNodes,
  nodeAddressSplitArray,
  updateMainTemplate,
  updateToDo,
}: FindAndUpdateNode) => {
  // const reducer = (accumulated: UIchild[], currentValue: UIchild) => previousValue + currentValue;

  // // 1 + 2 + 3 + 4
  // console.log(array1.reduce(reducer));

  // nodeAddressSplitArray.

  nodes.forEach((uiChild, index) => {
    const nodeAddressedPosition = nodeAddressSplitArray[0];
    const currentNodeDepth = parseInt(nodeAddressedPosition);

    const hasReachedSelectedNode = nodeAddressSplitArray.length === 1;

    if (hasReachedSelectedNode && index === currentNodeDepth) {
      console.log("Reached Selected Node:", uiChild.tagName);
      if (uiChild?.props?.color) {
        uiChild.props[updateToDo.key] = updateToDo.value; // do changes... Need to pass these in too
        // ^ mutating the originalNodes, copied off mainTemplate
        updateMainTemplate(originalNodes);
      }
      console.log({ originalNodes });
    } else {
      nodeAddressSplitArray.shift();

      const nextNodeAddressedPosition = nodeAddressSplitArray[0];
      const nectNodeDepth = parseInt(nextNodeAddressedPosition);

      const nextNode = uiChild.children?.[nectNodeDepth];

      if (nextNode) {
        // ^takes first/current-item off the list,
        // before looping again, because it accesses the first one every time

        if (nodeAddressSplitArray) {
          findAndUpdateNode({
            nodes: nextNode.children,
            originalNodes,
            nodeAddressSplitArray,
            updateMainTemplate,
            updateToDo,
          });
        }
      }
    }
  });
};
