import React from "react";
import { useTemplateStore } from "../../stores/templateStore";
import { UIchild } from "../../translators/TemplateToComponents";
import { TreeItem } from "./TreeItemStyled";

interface props {
  item: UIchild;
  nodeAddress: string;
}

export const TreeItemLabelBox: React.FC<props> = ({ item, nodeAddress }) => {
  const selectedNode = useTemplateStore((state) => state.selectedNode);
  const updateSelectedNode = useTemplateStore(
    (state) => state.updateSelectedNode
  );

  const updateSelectedNodeAddress = useTemplateStore(
    (state) => state.updateSelectedNodeAddress
  );

  const handleTreeItemClick = () => {
    // opens InnerSidebar
    updateSelectedNode(item); // UIChild
    updateSelectedNodeAddress(nodeAddress);

    console.log({ nodeAddress, "item.props": item.props });
  };

  return (
    <TreeItem
      onClick={handleTreeItemClick}
      selected={selectedNode?.id === item.id}
    >
      {item.props?.nickname || item.tagName}
    </TreeItem>
  );
};
