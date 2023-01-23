import create, { SetState } from "zustand";
import { UIchild } from "../translators/TemplateToComponents";

type ISet = {
  selectedNode?: UIchild;
  updateSelectedNode: (selectedNode?: UIchild) => void;

  selectedNodeAddress?: string;
  updateSelectedNodeAddress: (selectedNodeAddress?: string) => void;

  mainTemplate: UIchild[];
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
};

export const useTemplateStore = create<ISet>((set: SetState<ISet>) => ({
  selectedNode: undefined,
  updateSelectedNode: (selectedNode?: UIchild) =>
    set((_state: ISet) => {
      return { selectedNode };
    }),

  selectedNodeAddress: undefined,
  updateSelectedNodeAddress: (selectedNodeAddress?: string) =>
    set((_state: ISet) => {
      return { selectedNodeAddress };
    }),

  mainTemplate: [],
  updateMainTemplate: (mainTemplate: UIchild[]) =>
    set((_state: ISet) => {
      return { mainTemplate };
    }),
}));
