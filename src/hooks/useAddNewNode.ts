import { randomString } from "../functions/generic_utils";
import { useTemplateStore } from "../stores/templateStore";

const get_New_Thing = () => ({
  id: randomString(),
  tagName: "GenericBox",
  props: {
    color: "lightblue",
    position: [0, 0, 0],
    dimensions: [5, 5, 5],
    rotation: [0, 0, 0],
  },
  children: [],
});

export const useAddNewNode = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );

  const handleAddNode = () => {
    const updatedTemplate = [...mainTemplate];

    const new_thing = get_New_Thing();

    updatedTemplate[0].children.push(new_thing);

    updateMainTemplate(updatedTemplate);
  };

  return { handleAddNode };
};
