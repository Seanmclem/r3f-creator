import { sendNodeUpdate } from "../utils/editor-tree-functions";
import { useTemplateStore } from "../stores/templateStore";
import { KeyValueProp } from "../types/shared";
import { HistoryItem, useHistoryStore } from "../stores/historyStore";
import { randomString } from "../utils/generic_utils";

export const useSendNodeUpdate = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );
  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  const add_to_history_list = useHistoryStore(
    (state) => state.add_to_history_list
  );

  const history_list = useHistoryStore((state) => state.history_list);

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

  const handleDelete = () => {
    if (selectedNodeAddress) {
      sendNodeUpdate({
        nodeAddress: selectedNodeAddress,
        mainTemplate,
        updateMainTemplate,
        update: {}, // empty because delete doesn't need an update
        action: "DELETE",
      });

      const new_history_item: HistoryItem = {
        action: "DELETE",
        path: selectedNodeAddress,
        id: selectedNode?.id || "",
        previousValue: selectedNode,
        newValue: undefined,
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
  }: {
    tagName: string;
    template_props: any;
  }) => {
    const updatedTemplate = [...mainTemplate];

    const new_thing = {
      id: randomString(),
      tagName,
      props: { ...template_props },
      children: [],
    };

    updatedTemplate[0].children.push(new_thing);

    updateMainTemplate(updatedTemplate);

    const new_history_item: HistoryItem = {
      action: "ADD",
      path: `0.${mainTemplate[0].children.length}`, // last postion, plus one?,
      id: selectedNode?.id || "",
      previousValue: undefined,
      newValue: new_thing,
    };

    add_to_history_list(new_history_item);

    console.log({ mainTemplate, history_list });
  };

  // need to add a handleAdd function, also where is the
  //  existing add to history list function?

  return { handleUpdate, handleDelete, handleAddNode };
};
