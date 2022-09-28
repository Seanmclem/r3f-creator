import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spacer } from "../../../Spacer";
import { FieldDefinition } from "../../SelectedNodeSidebar";

interface props {
  idx: number;
  existingValue: string;
  fieldDefinition: FieldDefinition;

  updateArray: (val: string, idx: number, isNumeric?: boolean) => void;
}

export const ArrayFieldTextInput: React.FC<props> = ({
  idx,
  existingValue,
  fieldDefinition,

  updateArray,
}) => {
  const [textValue, setTextValue] = useState(existingValue as string);
  const [isNumeric] = useState(fieldDefinition.type === "number");

  const handleChange = (event: any) => {
    setTextValue(event.target.value); // updates value in input
    updateArray(event.target.value, idx, isNumeric);
  };

  useEffect(() => {
    // keeps input in-sync if value updated from gizmo
    setTextValue(existingValue);
  }, [existingValue]);

  const name = `${fieldDefinition.key}-${idx}`;

  return (
    <Container>
      <>
        <label htmlFor={name}>{fieldDefinition.key}</label>
        <Spacer width={5} height={5} />{" "}
      </>

      <input
        id={name}
        name={name}
        type={isNumeric ? "number" : "text"}
        onChange={handleChange}
        value={textValue || ""}
        style={{ width: "100%" }}
      />
    </Container>
  );
};

const Container = styled.div`
  /* width: 30%; */
`;
