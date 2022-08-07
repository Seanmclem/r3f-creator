import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TyperThing, whatAreTheseTYPES } from "../../../functions/type-utils";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { Space } from "../../../pages/_OLD_AstTools";
import { useTemplateStore } from "../../../stores/templateStore";
import { Spacer } from "../../Spacer";
import { ArrayItemTextBox } from "./ArrayItemTextBox";

interface props {
  propKey: string;
  propValue: unknown[];
  myTypeNow: TyperThing;
}

export const PropsArray: React.FC<props> = ({
  propKey,
  propValue,
  myTypeNow,
}) => {
  const selectedNode = useTemplateStore((state) => state.selectedNode);
  const [hasMounted, setHasMounted] = useState(false);

  const types = whatAreTheseTYPES(selectedNode!.tagName);
  const propType = types[propKey]; // <- controlType
  console.log("ARRAY-pio_controlType", { propType });

  const [arrayOfValues, setArrayOfValues] = useState(propValue);
  const handleUpdate = useSendNodeUpdate();

  const updateArray = (val: string, idx: number) => {
    const newArray = [...arrayOfValues];
    newArray[idx] = val;
    setArrayOfValues(newArray);
  };

  const handleSaveClick = () => {
    console.log("PropsArray -> handleSaveClick -> ", {
      key: propKey,
      value: arrayOfValues.map((val) => parseInt(val as string)), // PARSEiNT
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
          <Spacer height={10} />
          <ArrayItemTextBox
            originalItem={propValue[idx]}
            arrayItemIdx={idx}
            arrayItemValue={arrayItem}
            name={`${propKey}-${idx}`}
            updateArray={updateArray}
            // label={`item-${idx}`}
            propKeyValue={{ key: propKey, value: propValue }}
            propType={propType}
          />
        </Container>
      ))}
      {/* <Spacer height={20} /> */}
      {/* <button onClick={handleSaveClick}>Save</button> */}
    </Container>
  );
};

const Container = styled.div``;
