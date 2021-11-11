import create, { SetState } from "zustand";
import { UIchild } from "../translators/TemplateToComponents";

type ISet = {
  mainTemplate: UIchild[];
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
};

export const useTemplateStore = create<ISet>((set: SetState<ISet>) => ({
  mainTemplate: [],
  updateMainTemplate: (updatedTemplate: UIchild[]) =>
    set((_state: ISet) => {
      debugger;
      return { mainTemplate: updatedTemplate };
    }),
}));
