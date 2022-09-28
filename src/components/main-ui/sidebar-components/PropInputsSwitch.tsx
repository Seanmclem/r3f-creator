import React from "react";
import { RuntimeInterface } from "../SelectedNodeSidebar";
import { ArrayFieldsGroup } from "./prop-fields/ArrayFieldsGroup";
import { StringFieldTextInput } from "./prop-fields/StringFieldTextInput";

interface props {
  runtimeInterfaces: RuntimeInterface[];
}

export const PropInputsSwitch: React.FC<props> = ({ runtimeInterfaces }) => {
  return (
    <>
      {runtimeInterfaces?.map((runtimeInterface: RuntimeInterface) => (
        <div key={runtimeInterface.propName}>
          {/* Switch statement here eventually */}
          {runtimeInterface.typeData.type === "ARRAY" ? (
            <ArrayFieldsGroup runtimeInterface={runtimeInterface} />
          ) : null}

          {runtimeInterface.typeData.type === "STRING" ? (
            <StringFieldTextInput runtimeInterface={runtimeInterface} />
          ) : null}
        </div>
      ))}
    </>
  );
};
