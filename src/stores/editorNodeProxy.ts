import { proxy } from "valtio";

interface EditorNode {
  uid: string;
  showPivotControls: boolean;
  isSelected: boolean;
}

type EditorNodes = Record<string, EditorNode>;

export const editorNodeState = proxy<EditorNodes>({});
