import { Checkbox } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../../hooks/useSendNodeUpdate";
import { useTemplateStore } from "../../../../stores/templateStore";
import { RuntimeInterface } from "../../SelectedNodeSidebar";

interface props {
  runtimeInterface: RuntimeInterface;
}

export const BooleanFieldInput: React.FC<props> = ({ runtimeInterface }) => {
  const sendNodeUpdate = useSendNodeUpdate();
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  const currentProps_Value = selectedNode?.props?.[runtimeInterface?.propName];

  const [boolean_value, set_boolean_value] = useState<boolean>(
    !!currentProps_Value
  );

  const handlePropUpdate = () => {
    const update: any = {
      key: runtimeInterface?.propName,
      value: boolean_value,
    };

    console.log("PropsText -> handlePropUpdate -> ", {
      selectedNode_id: selectedNode?.id,
      key: runtimeInterface?.propName,
      value: boolean_value,
      orig: currentProps_Value,
      update,
    });

    sendNodeUpdate(update);
  };

  useEffect(() => {
    set_boolean_value(currentProps_Value);
    // This lets the field-value change if selectedNode changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode?.id]);

  useEffect(() => {
    const currentProps_Value =
      selectedNode?.props?.[runtimeInterface?.propName];

    if (boolean_value !== currentProps_Value) {
      handlePropUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boolean_value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_boolean_value(event.currentTarget.checked);
  };

  return (
    <Container>
      <Heading>
        {runtimeInterface.typeData.label_override || runtimeInterface.propName}
      </Heading>

      <Body>
        <Checkbox
          label={runtimeInterface.propName}
          style={{ userSelect: "none" }}
          checked={boolean_value}
          onChange={handleChange}
        />
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
