import React, { useRef, useState } from "react";
import styled from "styled-components";

interface props {
  originalItem: any;
  arrayItemIdx: number;
  arrayItemValue: unknown;
  name: string;
  label?: string;
  updateArray: (val: string, idx: number) => void;
}

export const ArrayItemTextBox: React.FC<props> = ({
  originalItem,
  arrayItemIdx,
  arrayItemValue,
  name,
  label,
  updateArray,
}) => {
  const daType = useRef(typeof arrayItemValue);
  const [textValue, setTextValue] = useState(arrayItemValue as string);
  const [hasChanges, setHasChanges] = useState(false);

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
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        name={name}
        type={"number"}
        onChange={handleChange}
        value={textValue}
      />
      <span>{hasChanges ? "changes" : ""}</span>
    </div>
  );
};

const Container = styled.div``;
