import React, { useState } from "react";
import styled from "styled-components";
import { Spacer } from "../../../../Spacer";
import { FieldDefinition } from "../../../SelectedNodeSidebar";

interface props {
  idx: number;
  existingValue: string;
  fieldDefinition: FieldDefinition;
}

export const ArrayFieldTextInput: React.FC<props> = ({
  idx,
  existingValue,
  fieldDefinition,
}) => {
  const [textValue, setTextValue] = useState(existingValue as string);
  const [isNumeric] = useState(fieldDefinition.type === "number");

  const handleChange = (event: any) => {
    setTextValue(event.target.value); // updates value in input
    //   updateArray(event.target.value, arrayItemIdx, isNumeric); //// updates larger object
  };

  const name = `${fieldDefinition.key}-${idx}`;

  return (
    <Container>
      <>
        <label htmlFor={name}>
          {idx}
          {") "}
          {fieldDefinition.key}
        </label>
        <Spacer width={5} height={5} />{" "}
      </>

      <input
        id={name}
        name={name}
        type={isNumeric ? "number" : "text"}
        onChange={handleChange}
        value={textValue || ""}
      />
    </Container>
  );
};

const Container = styled.div``;
