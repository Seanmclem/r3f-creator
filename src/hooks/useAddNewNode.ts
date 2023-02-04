import { randomString } from "../utils/generic_utils";
import { useTemplateStore } from "../stores/templateStore";

const get_New_Thing = ({ tagName, template_props }: any) => ({
  id: randomString(),
  tagName,
  props: { ...template_props },
  children: [],
});

export const useAddNewNode = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );

  const handleAddNode = ({ tagName, template_props }: any) => {
    const updatedTemplate = [...mainTemplate];

    const new_thing = get_New_Thing({ tagName, template_props });

    updatedTemplate[0].children.push(new_thing);

    updateMainTemplate(updatedTemplate);

    console.log(mainTemplate);
  };

  return { handleAddNode };
};
