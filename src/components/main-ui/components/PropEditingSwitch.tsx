import React from "react";
import {
  isSupportingType,
  ISupportingTypes,
  PrimitiveType,
} from "../../../functions/type-utils";
import { PropsArray } from "./PropsArray";
import { PropsBool } from "./PropsBool";
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

  const myTypeNow = (): PrimitiveType => {
    if (propKey === "args") {
      return "args-array";
    } else if (controlType.type.includes("string")) {
      return "string";
    } else if (controlType.type.includes("number")) {
      return "number";
    } else if (controlType.type.includes("boolean")) {
      return "boolean";
    } else if (isSupportingType(controlType.type)) {
      //const theSupportingType = ISupportingTypes[controlType.type];
      return "props-array";
    } else {
      // DEFAULT
      console.log({ "controlType.type": controlType.type });
      return "string";
    }
  };

  const isString = myTypeNow() === "string";
  const isArgs = myTypeNow() === "args-array";
  const isBool = myTypeNow() === "boolean";
  const isPropsArray = myTypeNow() === "props-array";

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
  } else if (isBool) {
    return (
      <PropsBool
        propKey={propKey}
        propValue={propValue as boolean}
        controlType={controlType}
        myTypeNow={myTypeNow()}
      />
    );
  } else {
    console.log(`${propKey} -> DEFAULT`);
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
