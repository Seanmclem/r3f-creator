import React from "react";
import { PropsArray } from "./PropsArray";
import { PropsText } from "./PropsText";

interface props {
  propKey: string;
  propValue: unknown;
}

export const PropEditingSwitch: React.FC<props> = ({ propKey, propValue }) => {
  if (typeof propValue === "string") {
    return <PropsText propKey={propKey} propValue={propValue} />;
  } else if (Array.isArray(propValue) && propValue?.length !== undefined) {
    return <PropsArray propKey={propKey} propValue={propValue} />;
  } else {
    return <PropsText propKey={propKey} propValue={propValue as string} />;
  }
};
