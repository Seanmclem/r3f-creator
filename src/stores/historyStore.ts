import create, { SetState } from "zustand";
import { useSendNodeUpdate } from "../hooks/useSendNodeUpdate";

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

  current_history_item_index: number;
  decrement_current_history_index: () => void;
  increment_current_history_index: () => void;
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
      return { history_list: [new_history_item, ...state.history_list] };
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
  current_history_item_index: 0,
  decrement_current_history_index: () => {
    set((state: ISet) => {
      return {
        current_history_item_index: state.current_history_item_index - 1,
      };
    });
  },
  increment_current_history_index: () => {
    set((state: ISet) => {
      return {
        current_history_item_index: state.current_history_item_index + 1,
      };
    });
  },
}));

export const useBackwardInHistory = () => {
  const increment_current_history_index = useHistoryStore(
    (state) => state.increment_current_history_index
  );
  const current_history_item_index = useHistoryStore(
    (state) => state.current_history_item_index
  );
  const history_list = useHistoryStore((state) => state.history_list);
  const { handleAddNode, handleDelete } = useSendNodeUpdate();

  const current_component_in_history = history_list[current_history_item_index];

  const go_back_in_history = () => {
    if (!current_component_in_history) {
      console.log("No more history to go back to");
      // no more history to go back to
      return;
    }

    increment_current_history_index();

    if (current_component_in_history.action === "ADD") {
      console.log("Undo - ADD ... so, remove");
      handleDelete({
        undo_ADD: {
          node_address: current_component_in_history.path,
          node_id: current_component_in_history.id,
        },
      });
    } else if (current_component_in_history.action === "UPDATE") {
      console.log("UPDATE");
    } else if (current_component_in_history.action === "DELETE") {
      console.log("DELETE");
    }
  };

  return { go_back_in_history };
};
