import React from "react";
import { PropsArray } from "./PropsArray";
import { PropsText } from "./PropsText";

interface props {
  propKey: string;
  propValue: unknown;
  selectedNode_IProps: any;
}

export const PropEditingSwitch: React.FC<props> = ({
  propKey,
  propValue,
  selectedNode_IProps,
}) => {
  const isString = typeof propValue === "string";
  const isArray = Array.isArray(propValue) && propValue?.length !== undefined;

  if (isString) {
    return <PropsText propKey={propKey} propValue={propValue} />;
  } else if (isArray) {
    return <PropsArray propKey={propKey} propValue={propValue} />;
  } else {
    return <PropsText propKey={propKey} propValue={propValue as string} />;
  }
};
