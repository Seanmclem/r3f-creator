import { sendNodeUpdate } from "../functions/editor-tree-functions";
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
      console.error("useSendNodeUpdate - has no selectedNodeAddress");
    }
  };

  return handleUpdate;
};
