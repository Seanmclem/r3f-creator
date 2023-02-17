import { signal } from "@preact/signals-core";
import { computed } from "@preact/signals-react";

export type NodeAction_Signal = "ADD" | "UPDATE" | "DELETE";

export interface HistoryItem_Signal {
  action: NodeAction_Signal;
  path: string;
  id: string;
  previousValue?: unknown;
  newValue?: unknown;
  /** needs an isHistoryUpdate flag to prevent infinite loop */
  isHistoryUpdate?: boolean;
}

export const current_history_item_INDEX_SIGNAL = signal(0);

export const history_list_SIGNAL = signal<HistoryItem_Signal[]>([]);

export const increment_current_history_index_SIGNAL = () => {
  current_history_item_INDEX_SIGNAL.value =
    current_history_item_INDEX_SIGNAL.value + 1;
};

export const decrement_current_history_index_SIGNAL = () => {
  current_history_item_INDEX_SIGNAL.value =
    current_history_item_INDEX_SIGNAL.value - 1;
};

export const add_to_history_list_SIGNAL = (
  new_history_item: HistoryItem_Signal
) => {
  if (new_history_item.isHistoryUpdate) {
    return;
  }
  history_list_SIGNAL.value.unshift(new_history_item);
};

const current_component_in_history_SIGNAL = computed(
  () => history_list_SIGNAL.value[current_history_item_INDEX_SIGNAL.value]
);

export const go_back_in_history = (
  handleDelete: ({
    undo_ADD,
  }: {
    undo_ADD?:
      | {
          node_address?: string | undefined;
          node_id?: string | undefined;
        }
      | undefined;
  }) => void
) => {
  debugger;

  if (!current_component_in_history_SIGNAL.value) {
    console.log("No more history to go back to");
    // no more history to go back to
    return;
  }

  if (current_component_in_history_SIGNAL.value.action === "ADD") {
    console.log("Undo - ADD ... so, remove");
    handleDelete({
      undo_ADD: {
        node_address: current_component_in_history_SIGNAL.value.path,
        node_id: current_component_in_history_SIGNAL.value.id,
      },
    });
    increment_current_history_index_SIGNAL();
  } else if (current_component_in_history_SIGNAL.value.action === "UPDATE") {
    console.log("UPDATE");
  } else if (current_component_in_history_SIGNAL.value.action === "DELETE") {
    console.log("DELETE");
  }
};

export const forward_in_history = (
  handleAddNode: ({
    tagName,
    template_props,
    isHistoryUpdate,
  }: {
    tagName: string;
    template_props: any;
    isHistoryUpdate?: boolean | undefined;
  }) => void
) => {
  if (current_history_item_INDEX_SIGNAL.value === 0) {
    console.log("No more history to go forward to");
    // no more history to go forward to
    return;
  }

  decrement_current_history_index_SIGNAL();

  const current_component_in_history =
    history_list_SIGNAL.value[current_history_item_INDEX_SIGNAL.value];

  console.log(
    "current_history_item_index_1",
    current_history_item_INDEX_SIGNAL.value
  );

  //

  if (current_component_in_history.action === "ADD") {
    console.log("~Add");

    console.log("REDO", {
      tagName: (current_component_in_history.newValue as any).tagName as string,
      template_props: (current_component_in_history.newValue as any)
        ?.props as any,
      isHistoryUpdate: true,
    });

    handleAddNode({
      tagName: (current_component_in_history.newValue as any).tagName as string,
      template_props: (current_component_in_history.newValue as any)
        ?.props as any,
      isHistoryUpdate: true,
    });
  } else if (current_component_in_history.action === "UPDATE") {
    console.log("UPDATE");
  } else if (current_component_in_history.action === "DELETE") {
    console.log("DELETE");
  }
};
