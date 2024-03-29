import { NodeAction } from "../signals-state/history-signals";
import { UIchild } from "../translators/TemplateToComponents";

export interface SendNodeUpdate {
  /** String path to node. Example `"0.3.1.0"` */
  nodeAddress: string;
  /** Zustand store value for global template */
  mainTemplate: UIchild[];
  /** Zustand store update function */
  updateMainTemplate: (mainTemplate: UIchild[]) => void;
  /** Update payload */
  update: any;
  /** Action to perform on node */
  action?: NodeAction;
}

export const sendNodeUpdate = ({
  nodeAddress,
  mainTemplate,
  updateMainTemplate,
  update,
  action,
}: SendNodeUpdate) => {
  const { nodeAddressSplitArray, mainTemplateCopy } = getNodesBreakdown({
    nodeAddress,
    mainTemplate,
  });
  const numericIndicies = nodeAddressSplitArray.map((x) => parseInt(x));
  const { newTemplate, previousValue } = deepSplice({
    main_template_copy: mainTemplateCopy, // mainTemplate copy
    indices: numericIndicies, // [0, 3, 1, 0]
    deleteCount: 1, // always 1
    update, // update to be spread-in
    action: action || "UPDATE",
  });

  updateMainTemplate(newTemplate || []);

  return { newTemplate, previousValue };
};

// Thanks to Q+A at https://stackoverflow.com/questions/62268544/using-an-array-of-indices-to-access-and-modify-arbitrarily-deep-nested-arrays-in
export const deepSplice = ({
  main_template_copy,
  indices,
  deleteCount,
  update,
  action,
}: {
  main_template_copy: UIchild[];
  indices: number[];
  deleteCount: number;
  update: { key: string; value: unknown };
  action: NodeAction;
}) => {
  const last = indices.pop() as number;
  const finalItems = indices.reduce(
    (acc, i) => acc[i].children,
    main_template_copy
  );

  const changingItem = finalItems[last];
  const previousValue = {
    key: update.key,
    value: structuredClone(changingItem.props[update.key]),
  };

  if (action === "UPDATE") {
    changingItem.props[update.key] = update.value;
    finalItems.splice(last, deleteCount, changingItem);
    return { newTemplate: main_template_copy, previousValue };
  } else if (action === "DELETE") {
    changingItem.props[update.key] = update.value;
    finalItems.splice(last, deleteCount);
    return { newTemplate: main_template_copy };
  } else {
    // Placeholder for "ADD" action
    return { newTemplate: main_template_copy, previousValue };
  }

  // console.log({ finalItems });
};

export interface NodesBreakdown {
  nodeAddressSplitArray: string[];
  mainTemplateCopy: UIchild[];
}

export const getNodesBreakdown = ({
  nodeAddress,
  mainTemplate,
}: {
  nodeAddress: string;
  mainTemplate: UIchild[];
}): NodesBreakdown => {
  const nodeAddressSplitArray = nodeAddress.split(".");
  // nodeAddressSplitArray.shift();
  const mainTemplateCopy = [...mainTemplate];

  return { nodeAddressSplitArray, mainTemplateCopy };
};
