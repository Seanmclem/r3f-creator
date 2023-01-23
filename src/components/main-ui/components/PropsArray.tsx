import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  PropArrayOption,
  PrimitiveType,
  whatAreTheseTYPES,
} from "../../../utils/type-utils";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { useTemplateStore } from "../../../stores/templateStore";
import { Spacer } from "../../Spacer";
import { ArrayItemTextBox } from "./ArrayItemTextBox";

interface props {
  propKey: string;
  propValue: unknown[];
  myTypeNow: PrimitiveType;
}

export const PropsArray: React.FC<props> = ({
  propKey,
  propValue,
  myTypeNow,
}) => {
  const selectedNode = useTemplateStore((state) => state.selectedNode);
  const [hasMounted, setHasMounted] = useState(false);

  const intrinsicElements_AllPropTypes = whatAreTheseTYPES(
    selectedNode!.tagName
  );
  const propType: PropArrayOption[] = intrinsicElements_AllPropTypes[propKey]; // <- controlType
  console.log("ARRAY-pio_controlType", {
    intrinsicElements_AllPropTypes,
    myTypeNow,
    propType,
    propKey,
    propValue,
  });

  /** Already populated values */
  const [arrayOfValues, setArrayOfValues] = useState(propValue);
  const { handleUpdate } = useSendNodeUpdate();

  const updateArray = (val: string, idx: number, isNumeric = false) => {
    const newArray = [...arrayOfValues];
    newArray[idx] = isNumeric ? parseInt(val as string) : val;
    setArrayOfValues(newArray);
  };

  const handleSaveClick = () => {
    console.log("PropsArray -> handleSaveClick -> ", {
      key: propKey,
      value: arrayOfValues, // PARSEiNT
      orig: propValue,
    });
    handleUpdate({
      key: propKey,
      value: arrayOfValues,
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

  const getArrayItem = (typeData: PropArrayOption) => {
    const result = arrayOfValues[typeData.index];
  };

  return (
    <Container>
      <label>{propKey}</label>
      <ul>
        {propType.map((typeData) => (
          <li>
            <Container key={typeData.index}>
              {/* <label>{typeData.key}</label>
              <Spacer height={10} />
              <label>{arrayOfValues[typeData.index] as string}</label> */}
              <ArrayItemTextBox
                originalItem={propValue[typeData.index]}
                arrayItemIdx={typeData.index}
                arrayItemValue={arrayOfValues[typeData.index]}
                updateArray={updateArray}
                propKeyValue={{ key: propKey, value: propValue }}
                typeData={typeData}
              />
            </Container>
          </li>
        ))}
      </ul>
      {/* {arrayOfValues.map((arrayItem, idx) => (
        // Iterate over PROP TYPES here, instead of values, patch-n values
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
      ))} */}
      {/* <Spacer height={20} /> */}
      {/* <button onClick={handleSaveClick}>Save</button> */}
    </Container>
  );
};

const Container = styled.div``;
