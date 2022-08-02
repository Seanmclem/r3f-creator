import React, { useState } from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { ArrayItemTextBox } from "./ArrayItemTextBox";

interface props {
  propKey: string;
  propValue: unknown[];
}

export const PropsArray: React.FC<props> = ({ propKey, propValue }) => {
  console.log({ propKey, propValue });
  const handleUpdate = useSendNodeUpdate();

  const [arrayOfValues, setArrayOfValues] = useState(propValue);

  const updateArray = (val: string, idx: number) => {
    const newArray = [...arrayOfValues];
    newArray[idx] = val;
    setArrayOfValues(newArray);
  };

  return (
    <Container>
      {arrayOfValues.map((arrayItem, idx) => (
        <Container key={idx}>
          <ArrayItemTextBox
            originalItem={propValue[idx]}
            arrayItemIdx={idx}
            arrayItemValue={arrayItem}
            name={`${propKey}-${idx}`}
            updateArray={updateArray}
            label={`item-${idx}`}
          />
        </Container>
      ))}
      {/* <Spacer height={20} /> */}
      <button
        onClick={() => handleUpdate({ key: propKey, value: arrayOfValues })}
      >
        Save
      </button>
    </Container>
  );
};

const Container = styled.div``;
