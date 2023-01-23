import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../../hooks/useSendNodeUpdate";
import { useTemplateStore } from "../../../../stores/templateStore";
import { FieldDefinition, RuntimeInterface } from "../../SelectedNodeSidebar";
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
  const { handleUpdate } = useSendNodeUpdate();

  const selectedNode = useTemplateStore((state) => state.selectedNode);

  // console.log({ selectedNode });

  // this component only shows in selectedNodeSidebar anyway
  const currentProps_AllArrayValues =
    selectedNode?.props?.[runtimeInterface?.propName];

  if (!currentProps_AllArrayValues) {
    return null;
  }
  const currentProp_SpecificArrayValue =
    currentProps_AllArrayValues[arrayFieldIndex];

  const updateArray = (val: string, idx: number, isNumeric = false) => {
    const newArray = [...currentProps_AllArrayValues];
    newArray[idx] = isNumeric ? parseInt(val as string) : val;
    console.log({
      key: runtimeInterface.propName,
      value: newArray,
    });

    // setArrayValue(newArray);
    handleUpdate({
      key: runtimeInterface.propName,
      value: newArray,
    });
  };

  return (
    <Container>
      {/* <p>{mainTemplate.length}</p> */}
      <ArrayFieldTextInput
        idx={arrayFieldIndex}
        existingValue={currentProp_SpecificArrayValue}
        fieldDefinition={fieldDefinition}
        updateArray={updateArray}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 20%;
  margin: 5%;
`;
