import { signal } from "@preact/signals-core";
import { computed } from "@preact/signals-react";

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

export const current_history_item_INDEX = signal(0);

export const history_list = signal<HistoryItem[]>([]);

export const increment_current_history_index = () => {
  current_history_item_INDEX.value = current_history_item_INDEX.value + 1;
};

export const decrement_current_history_index = () => {
  current_history_item_INDEX.value = current_history_item_INDEX.value - 1;
};

export const add_to_history_list = (new_history_item: HistoryItem) => {
  if (new_history_item.isHistoryUpdate) {
    return;
  }
  history_list.value.unshift(new_history_item);
};

const current_component_in_history = computed(
  () => history_list.value[current_history_item_INDEX.value]
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

  if (!current_component_in_history.value) {
    console.log("No more history to go back to");
    // no more history to go back to
    return;
  }

  if (current_component_in_history.value.action === "ADD") {
    console.log("Undo - ADD ... so, remove");
    handleDelete({
      undo_ADD: {
        node_address: current_component_in_history.value.path,
        node_id: current_component_in_history.value.id,
      },
    });
    increment_current_history_index();
  } else if (current_component_in_history.value.action === "UPDATE") {
    console.log("UPDATE");
  } else if (current_component_in_history.value.action === "DELETE") {
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
  if (current_history_item_INDEX.value === 0) {
    console.log("No more history to go forward to");
    // no more history to go forward to
    return;
  }

  decrement_current_history_index();

  const current_component_in_history =
    history_list.value[current_history_item_INDEX.value];

  console.log("current_history_item_index_1", current_history_item_INDEX.value);

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
