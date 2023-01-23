import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../../hooks/useSendNodeUpdate";
import { useTemplateStore } from "../../../../stores/templateStore";
import { RuntimeInterface } from "../../SelectedNodeSidebar";

interface props {
  runtimeInterface: RuntimeInterface;
}

export const StringFieldTextInput: React.FC<props> = ({ runtimeInterface }) => {
  const { handleUpdate } = useSendNodeUpdate();
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  const currentProps_Value = selectedNode?.props?.[runtimeInterface?.propName];

  useEffect(() => {
    setTextValue(currentProps_Value || "");
    // This lets the field-value change if selectedNode changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode?.id]);

  const [textValue, setTextValue] = useState(currentProps_Value || "");
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (event: any) => {
    setTextValue(event.target.value);
  };

  const handleRevert = () => {
    setTextValue(currentProps_Value);
  };

  useEffect(() => {
    // if text is not what's saved, then we say it hasChanges pending to save
    const hasDifferences = textValue !== currentProps_Value;
    if (hasDifferences !== hasChanges) {
      setHasChanges(hasDifferences);
    }
  }, [
    hasChanges,
    textValue,
    selectedNode?.props?.[runtimeInterface?.propName],
    currentProps_Value,
  ]);

  const handlePrepUpdate = () => {
    const update: any = { key: runtimeInterface?.propName, value: textValue };

    console.log("PropsText -> handlePrepUpdate -> ", {
      key: runtimeInterface?.propName,
      value: textValue,
      orig: currentProps_Value,
    });

    handleUpdate(update);
  };

  return (
    <Container>
      <Heading>{runtimeInterface.propName}</Heading>

      <Body>
        <input
          name={runtimeInterface.propName}
          type={"text"}
          onChange={handleChange}
          value={textValue}
          // placeholder={placeholder}
        />
        <button onClick={handlePrepUpdate}>✔</button>
        <button onClick={handleRevert}>x</button>
      </Body>
    </Container>
  );
};

const Heading = styled.div`
  background-color: lightblue;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 5px;
  padding-left: 10px;
  /* font-weight: bold; */
  font-size: 110%;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 5px;
  margin-bottom: 10px;
`;

const Body = styled.div`
  padding: 5px;
  padding: 10px;
  display: flex;
`;
