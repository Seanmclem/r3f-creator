import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { ArrayItemTextBox } from "./ArrayItemTextBox";

interface props {
  propKey: string;
  propValue: unknown[];
}

export const PropsArray: React.FC<props> = ({ propKey, propValue }) => {
  console.log({ propKey, propValue });
  const [hasMounted, setHasMounted] = useState(false);
  const handleUpdate = useSendNodeUpdate();

  const [arrayOfValues, setArrayOfValues] = useState(propValue);

  const updateArray = (val: string, idx: number) => {
    const newArray = [...arrayOfValues];
    newArray[idx] = val;
    setArrayOfValues(newArray);
  };

  const handleSaveClick = () => {
    console.log("PropsArray -> handleSaveClick -> ", {
      key: propKey,
      value: arrayOfValues.map((val) => parseInt(val as string)),
      orig: propValue,
    });
    handleUpdate({
      key: propKey,
      value: arrayOfValues.map((val) => parseInt(val as string)),
    });
  };

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
    if (hasMounted) {
      console.log("EFFECT");
      handleSaveClick();
    }
  }, [hasMounted, arrayOfValues]);

  return (
    <Container>
      <label>{propKey}</label>
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
      <button onClick={handleSaveClick}>Save</button>
    </Container>
  );
};

const Container = styled.div``;
