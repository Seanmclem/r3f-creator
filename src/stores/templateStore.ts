import create, { SetState } from "zustand";
import { UIchild } from "../translators/TemplateToComponents";

type ISet = {
  selectedNode?: UIchild;
  updateSelectedNode: (selectedNode: UIchild) => void;
  mainTemplate: UIchild[];
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
};

export const useTemplateStore = create<ISet>((set: SetState<ISet>) => ({
  selectedNode: undefined,
  updateSelectedNode: (updatedSelectedNode: UIchild) =>
    set((_state: ISet) => {
      return { selectedNode: updatedSelectedNode };
    }),
  mainTemplate: [],
  updateMainTemplate: (updatedTemplate: UIchild[]) =>
    set((_state: ISet) => {
      return { mainTemplate: updatedTemplate };
    }),
}));
