import { sendNodeUpdate } from "../utils/editor-tree-functions";
import { useTemplateStore } from "../stores/templateStore";
import { KeyValueProp } from "../types/shared";

import { randomString } from "../utils/generic_utils";
import {
  add_to_history_list,
  HistoryItem,
  history_list,
} from "../signals-state/history-signals";

export const useSendNodeUpdate = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );
  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  const handleUpdate = (update: KeyValueProp) => {
    if (selectedNodeAddress) {
      const { previousValue } = sendNodeUpdate({
        nodeAddress: selectedNodeAddress,
        mainTemplate,
        updateMainTemplate,
        update,
      });

      const new_history_item: HistoryItem = {
        action: "UPDATE",
        path: selectedNodeAddress,
        id: selectedNode?.id || "",
        previousValue: previousValue,
        newValue: update,
      };

      add_to_history_list(new_history_item);
    } else {
      console.error(
        "useSendNodeUpdate - UPDATE - no selectedNodeAddress provided"
      );
    }
  };

  const handleDelete = ({
    undo_ADD,
  }: {
    undo_ADD?: { node_address?: string; node_id?: string };
  }) => {
    debugger;
    // for undo-ADD functionality, we need to know the node_address and node_id of the node that was added, instead of the selectedNodeAddress
    const selected_node_address = undo_ADD?.node_address || selectedNodeAddress;

    if (selected_node_address) {
      sendNodeUpdate({
        nodeAddress: selected_node_address,
        mainTemplate,
        updateMainTemplate,
        update: {}, // empty because delete doesn't need an update
        action: "DELETE",
      });

      const new_history_item: HistoryItem = {
        action: "DELETE",
        path: selected_node_address,
        id: undo_ADD?.node_id || selectedNode?.id || "",
        previousValue: selectedNode,
        newValue: undefined,
        isHistoryUpdate: !!undo_ADD,
      };

      add_to_history_list(new_history_item);
    } else {
      console.error(
        "useSendNodeUpdate - DELETE - no selectedNodeAddress provided"
      );
    }
  };

  const handleAddNode = ({
    tagName,
    template_props,
    isHistoryUpdate = false,
  }: {
    tagName: string;
    template_props: any;
    isHistoryUpdate?: boolean;
  }) => {
    console.log("handleAddNode", { tagName, template_props, isHistoryUpdate });
    const updatedTemplate = [...mainTemplate];

    const new_thing = {
      id: randomString(),
      tagName,
      props: { ...template_props },
      children: [],
    };
    debugger;
    updatedTemplate[0].children.push(new_thing);

    updateMainTemplate(updatedTemplate);

    const new_history_item: HistoryItem = {
      action: "ADD",
      path: `0.${mainTemplate[0].children.length - 1}`, // last postion, plus one?,
      id: selectedNode?.id || "",
      previousValue: undefined,
      newValue: new_thing,
      isHistoryUpdate,
    };

    add_to_history_list(new_history_item);

    console.log({
      mainTemplate,
      history_list: history_list.value,
    });
  };

  // need to add a handleAdd function, also where is the
  //  existing add to history list function?

  return { handleUpdate, handleDelete, handleAddNode };
};
