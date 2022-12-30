import { ThreeEvent } from "@react-three/fiber";
import { useCallback } from "react";
import { useTemplateStore } from "../stores/templateStore";

export const useSelectComponent = ({
  idx,
  nodeItem,
}: {
  idx: number;
  nodeItem: any; // UIChild
}) => {
  const updateSelectedNode = useTemplateStore(
    (state) => state.updateSelectedNode
  );

  const updateSelectedNodeAddress = useTemplateStore(
    (state) => state.updateSelectedNodeAddress
  );

  const handle_select_component = useCallback(
    (event?: ThreeEvent<MouseEvent>) => {
      event?.stopPropagation?.();
      updateSelectedNode(nodeItem); // UIChild
      updateSelectedNodeAddress(`0.${idx}`);
    },
    [nodeItem, idx, updateSelectedNode, updateSelectedNodeAddress]
  );

  return { handle_select_component };
};
