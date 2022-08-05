import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { KeyValueProp } from "../../../types/shared";

interface props {
  propKey: string;
  propValue: string;
}

export const PropsText: React.FC<props> = ({ propKey, propValue }) => {
  const handleUpdate = useSendNodeUpdate();
  const [textValue, setTextValue] = useState(propValue);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePrepUpdate = () => {
    const update: KeyValueProp = { key: propKey, value: textValue };

    console.log("PropsText -> handlePrepUpdate -> ", {
      key: propKey,
      value: textValue,
      orig: propValue,
    });

    handleUpdate(update);
  };

  useEffect(() => {
    // if text is not what's saved, then we say it hasChanges pending to save
    const hasDifferences = textValue !== propValue;
    if (hasDifferences !== hasChanges) {
      setHasChanges(hasDifferences);
    }
  }, [hasChanges, textValue, propValue]);

  const handleChange = (event: any) => {
    setTextValue(event.target.value);
  };

  const handleRevert = () => {
    setTextValue(propValue);
  };

  return (
    <div className="input-label-container">
      {propKey ? <label htmlFor={propKey}>{propKey}</label> : null}
      <BasicInputRow>
        <input
          name={propKey}
          type={"text"}
          onChange={handleChange}
          value={textValue}
          // placeholder={placeholder}
        />
        <button onClick={handlePrepUpdate}>✔</button>
        <button onClick={handleRevert}>x</button>
      </BasicInputRow>

      {/* {error ? <span className="error">{error}</span> : null} */}
    </div>
  );
};

const BasicInputRow = styled.div`
  display: flex;
`;
