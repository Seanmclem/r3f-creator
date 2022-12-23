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
}

export const sendNodeUpdate = ({
  nodeAddress,
  mainTemplate,
  updateMainTemplate,
  update,
}: SendNodeUpdate) => {
  const { nodeAddressSplitArray, mainTemplateCopy } = getNodesBreakdown({
    nodeAddress,
    mainTemplate,
  });
  const numericIndicies = nodeAddressSplitArray.map((x) => parseInt(x));
  const newTemplate = deepSplice({
    array: mainTemplateCopy,
    indices: numericIndicies,
    deleteCount: 1,
    update,
    action: "UPDATE",
  });

  updateMainTemplate(newTemplate);
};

// Thanks to Q+A at https://stackoverflow.com/questions/62268544/using-an-array-of-indices-to-access-and-modify-arbitrarily-deep-nested-arrays-in
export const deepSplice = ({
  array,
  indices,
  deleteCount,
  update,
  action,
}: {
  array: UIchild[];
  indices: number[];
  deleteCount: number;
  update: { key: string; value: unknown };
  action?: "ADD" | "UPDATE" | "DELETE";
}) => {
  const last = indices.pop() as number;
  const finalItems = indices.reduce((acc, i) => acc[i].children, array);
  const changingItem = finalItems[last];

  if (action === "UPDATE") {
    changingItem.props[update.key] = update.value;
  }
  // console.log({ finalItems });
  finalItems.splice(last, deleteCount, changingItem);
  return array;
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
