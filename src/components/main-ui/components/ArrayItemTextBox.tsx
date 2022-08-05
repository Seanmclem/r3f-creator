import React, { useRef, useState } from "react";
import styled from "styled-components";
import { KeyValueProp } from "../../../types/shared";
import { Spacer } from "../../Spacer";

interface props {
  originalItem: any;
  arrayItemIdx: number;
  arrayItemValue: unknown;
  name: string;
  label?: string;
  updateArray: (val: string, idx: number) => void;
  propKeyValue: KeyValueProp;

  propType?: any;
}

export const ArrayItemTextBox: React.FC<props> = ({
  originalItem,
  arrayItemIdx,
  arrayItemValue,
  name,
  label,
  updateArray,
  propKeyValue,
  propType,
}) => {
  const daType = useRef(typeof arrayItemValue);
  const [textValue, setTextValue] = useState(arrayItemValue as string);
  const [hasChanges, setHasChanges] = useState(false);

  console.log("pooooooooo", { propKeyValue, propType });

  const handleChange = (event: any) => {
    const currentItem = arrayItemValue as string;
    const hasChanges =
      event.target.value.toString() !== originalItem.toString();

    console.log({
      val: event.target.value.toString(),
      curr: currentItem.toString(),
    });

    setTextValue(event.target.value);
    updateArray(event.target.value, arrayItemIdx);
    setHasChanges(hasChanges);
  };

  return (
    <div>
      <>
        <label htmlFor={name}>
          {arrayItemIdx}
          {") "}
          {propType?.[arrayItemIdx]?.key}
        </label>
        <Spacer width={5} height={5} />{" "}
      </>

      <input
        name={name}
        type={"number"}
        onChange={handleChange}
        value={textValue}
      />
      {/* <span>{hasChanges ? "changes" : ""}</span> */}
      {/* ^^ Maybe change to like a revert?, since saved automatically.. nah, idk */}
    </div>
  );
};

const Container = styled.div``;
