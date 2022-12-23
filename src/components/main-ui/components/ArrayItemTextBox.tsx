import React, { useRef, useState } from "react";
import styled from "styled-components";
import { PropArrayOption } from "../../../utils/type-utils";
import { KeyValueProp } from "../../../types/shared";
import { Spacer } from "../../Spacer";

interface props {
  originalItem: any;
  arrayItemIdx: number;
  arrayItemValue: unknown;
  updateArray: (val: string, idx: number, isNumeric?: boolean) => void;
  propKeyValue: KeyValueProp;

  typeData: PropArrayOption;
}

export const ArrayItemTextBox: React.FC<props> = ({
  originalItem,
  arrayItemIdx,
  arrayItemValue,
  updateArray,
  propKeyValue,
  typeData, // All possible values for the array, like all args
}) => {
  const [textValue, setTextValue] = useState(arrayItemValue as string);
  const [hasChanges, setHasChanges] = useState(false);

  const [isNumeric] = useState(typeData.type.includes("number"));

  const handleChange = (event: any) => {
    // fill empties in array here, before saving
    const currentItem = arrayItemValue as string;
    console.log({
      originalItem,
      "event.target.value.toString": event.target.value,
    });
    const hasChanges =
      event.target.value.toString() !== originalItem?.toString();

    console.log({
      new: event.target.value.toString(),
      curr: currentItem?.toString(),
    });

    setTextValue(event.target.value); // updates value in input
    updateArray(event.target.value, arrayItemIdx, isNumeric);
    setHasChanges(hasChanges);
  };

  const name = `${propKeyValue.key}-${typeData.index}`;

  return (
    <div>
      <>
        <label htmlFor={name}>
          {arrayItemIdx}
          {") "}
          {typeData.key}
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
      {/* <span>{hasChanges ? "changes" : ""}</span> */}
      {/* ^^ Maybe change to like a revert?, since saved automatically.. nah, idk */}
    </div>
  );
};

const Container = styled.div``;
