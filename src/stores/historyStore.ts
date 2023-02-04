import create, { SetState } from "zustand";

export type NodeAction = "ADD" | "UPDATE" | "DELETE";

export interface HistoryItem {
  action: NodeAction;
  path: string;
  id: string;
  previousValue?: unknown;
  newValue?: unknown;
  /** needs an isHistoryUpdate flag to prevent infinite loop */
  isHistoryUpdate?: boolean;
}

interface ISet {
  history_list: HistoryItem[];
  add_to_history_list: (new_history_item: HistoryItem) => void;
  //   update_history_list: (mainTemplate: any[]) => void
}

export const useHistoryStore = create<ISet>((set: SetState<ISet>) => ({
  history_list: [],
  /** Only need one function for adding to the end. Regardless of action */
  add_to_history_list: (new_history_item: HistoryItem) => {
    if (new_history_item.isHistoryUpdate) {
      // if the new_history_item is a history update, don't add it to the history list
      // should instead update the current history item indicatort.. Like a number of the index in history_list, to track the current history item
      // incrementing or decrementing based on undo/redo
      return;
    }
    console.log("add_to_history_list");
    set((state: ISet) => {
      return { history_list: [...state.history_list, new_history_item] };
    });
  },
  // Then, for Adds, store the path/id of the new node
  // For Updates, store the path/id, and the previous/new values
  // for Deletes, store the path/id, and the previous values
  // have a handler that takes in the action, and relevant data, and updates the history list
  //
  // update_history_list: (mainTemplate: any[]) =>
  //     set((_state: ISet) => {
  //       return { mainTemplate: updatedTemplate }
  //     })
}));
