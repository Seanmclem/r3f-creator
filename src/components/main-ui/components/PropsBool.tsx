import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PropOption, PrimitiveType } from "../../../functions/type-utils";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { KeyValueProp } from "../../../types/shared";

interface props {
  propKey: string;
  propValue: boolean;
  controlType: PropOption;
  myTypeNow: PrimitiveType;
}

export const PropsBool: React.FC<props> = ({
  propKey,
  propValue,
  controlType,
  myTypeNow,
}) => {
  const handleUpdate = useSendNodeUpdate();
  const [boolValue, setBoolValue] = useState(!!propValue);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePrepUpdate = (boolValueOverride: boolean) => {
    const update: KeyValueProp = { key: propKey, value: boolValueOverride };

    console.log("PropsBool -> handlePrepUpdate -> ", {
      key: propKey,
      value: boolValueOverride,
      orig: propValue,
    });

    handleUpdate(update);
  };

  useEffect(() => {
    // if text is not what's saved, then we say it hasChanges pending to save
    const hasDifferences = boolValue !== propValue;
    if (hasDifferences !== hasChanges) {
      setHasChanges(hasDifferences);
    }
  }, [hasChanges, boolValue, propValue]);

  const handleChange = () => {
    setBoolValue(!boolValue);
    handlePrepUpdate(!boolValue);
  };

  //   const handleRevert = () => {
  //     setBoolValue(propValue);
  //   };

  return (
    <Container>
      <label>
        {propKey}

        <input type="checkbox" checked={boolValue} onChange={handleChange} />
      </label>
    </Container>
  );
};

const Container = styled.div`
  label {
    user-select: none;
  }
`;
