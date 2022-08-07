import React from "react";
import { TyperThing } from "../../../functions/type-utils";
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
  const controlType = selectedNode_IProps[propKey];

  const myTypeNow = (): TyperThing => {
    if (propKey === "args") {
      return "args-array";
    } else if (controlType.type.includes("string")) {
      return "string";
    } else if (controlType.type.includes("number")) {
      return "number";
    } else {
      // DEFAULT
      return "string";
    }
  };

  const isString = myTypeNow() === "string";
  const isArgs = myTypeNow() === "args-array";

  if (isString) {
    return (
      <PropsText
        propKey={propKey}
        propValue={(propValue as string) || ""}
        controlType={controlType}
        myTypeNow={myTypeNow()}
      />
    );
  } else if (isArgs) {
    return (
      <PropsArray
        propKey={propKey}
        propValue={(propValue as any[]) || []}
        myTypeNow={myTypeNow()}
      />
    );
  } else {
    return (
      <PropsText
        propKey={propKey}
        propValue={propValue as string}
        controlType={controlType}
        myTypeNow={myTypeNow()}
      />
    );
  }
};
