import create, { SetState } from "zustand";

/** Object, where each key is the node-uid */
// type EditorNodes = Record<string, any>

interface EditorNode {
  uid: string;
  showPivotControls: boolean;
  isSelected: boolean;
}

interface ISet {
  nodeList: EditorNode[];
  updateNodeList: (editorNode: EditorNode) => void;
}

export const useTemplateStore = create<ISet>((set: SetState<ISet>) => ({
  nodeList: [],
  updateNodeList: (editorNode: EditorNode) =>
    set((state: ISet) => {
      const oldValues = state.nodeList.filter((x) => x.uid !== editorNode.uid);
      return { nodeList: [...oldValues, editorNode] };
    }),
}));
