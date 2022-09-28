import React from "react";
import { useTemplateStore } from "../../stores/templateStore";
import { UIchild } from "../../translators/TemplateToComponents";
import { TreeItem } from "./TreeItemStyled";

interface props {
  item: UIchild;
  nodeAddress: string;
}

export const TreeItemLabelBox: React.FC<props> = ({ item, nodeAddress }) => {
  // const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  // const updateMainTemplate = useTemplateStore(
  //   (state) => state.updateMainTemplate
  // );

  const selectedNode = useTemplateStore((state) => state.selectedNode);
  const updateSelectedNode = useTemplateStore(
    (state) => state.updateSelectedNode
  );

  const updateSelectedNodeAddress = useTemplateStore(
    (state) => state.updateSelectedNodeAddress
  );

  const handleTreeItemClick = () => {
    // opens InnerSidebar

    //sendNodeUpdate({ nodeAddress, mainTemplate, updateMainTemplate, update });
    // ^ Fixed

    // [x] save selectedNode to store
    updateSelectedNode(item); // UIChild
    updateSelectedNodeAddress(nodeAddress);
    // [x] open new sidebar in-reaction
    // [] display selected node's prop(s)
    // [] save edits, on button click.
    // [] use rewrite of loopChildren()?

    console.log({ nodeAddress });

    // console.log({ mainTemplate });
  };

  return (
    <TreeItem
      onClick={handleTreeItemClick}
      selected={selectedNode?.id === item.id}
    >
      {/* // onclick make red */}
      {item.tagName}
    </TreeItem>
  );
};
