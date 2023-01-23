import { sendNodeUpdate } from "../utils/editor-tree-functions";
import { useTemplateStore } from "../stores/templateStore";
import { KeyValueProp } from "../types/shared";

export const useSendNodeUpdate = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );
  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );

  const handleUpdate = (update: KeyValueProp) => {
    if (selectedNodeAddress) {
      sendNodeUpdate({
        nodeAddress: selectedNodeAddress,
        mainTemplate,
        updateMainTemplate,
        update,
      });
    } else {
      console.error("useSendNodeUpdate - no selectedNodeAddress provided");
    }
  };

  const handleDelete = () => {
    if (selectedNodeAddress) {
      sendNodeUpdate({
        nodeAddress: selectedNodeAddress,
        mainTemplate,
        updateMainTemplate,
        update: {}, // epty because delete?
        action: "DELETE",
      });
    } else {
      console.error("useSendNodeUpdate - no selectedNodeAddress provided");
    }
  };

  return { handleUpdate, handleDelete };
};
