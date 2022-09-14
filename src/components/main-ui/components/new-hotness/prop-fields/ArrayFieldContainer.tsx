import React from "react";
import styled from "styled-components";
import { useTemplateStore } from "../../../../../stores/templateStore";
import {
  FieldDefinition,
  RuntimeInterface,
} from "../../../SelectedNodeSidebar";
import { ArrayFieldTextInput } from "./ArrayFieldTextInput";

interface props {
  fieldDefinition: FieldDefinition;
  arrayFieldIndex: number;
  runtimeInterface: RuntimeInterface;
}

export const ArrayFieldContainer: React.FC<props> = ({
  fieldDefinition,
  arrayFieldIndex,
  runtimeInterface,
}) => {
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  console.log({ selectedNode });
  // this component only shows in selectedNode anyway
  const currentValue = selectedNode?.props?.[runtimeInterface?.propName];
  console.log({ currentValue });

  if (!currentValue) {
    return null;
  }
  return (
    <li>
      <ArrayFieldTextInput
        idx={arrayFieldIndex}
        existingValue={currentValue[arrayFieldIndex]}
        fieldDefinition={fieldDefinition}
      />
    </li>
  );
};

const Container = styled.div``;
