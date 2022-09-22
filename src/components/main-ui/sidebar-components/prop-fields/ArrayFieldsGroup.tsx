import React from "react";
import styled from "styled-components";
import { FieldDefinition, RuntimeInterface } from "../../SelectedNodeSidebar";
import { ArrayFieldContainer } from "./ArrayFieldContainer";

interface props {
  // fieldDefinition: FieldDefinition;
  // arrayFieldIndex: number;
  runtimeInterface: RuntimeInterface;
}
export const ArrayFieldsGroup: React.FC<props> = ({ runtimeInterface }) => {
  return (
    <Container>
      <Heading>{runtimeInterface.propName}</Heading>
      <Body>
        {runtimeInterface.typeData.fieldDefinitions?.map(
          (fieldDefinition, idx) => (
            <ArrayFieldContainer // <- Make pretty, code and UI
              fieldDefinition={fieldDefinition}
              arrayFieldIndex={idx}
              runtimeInterface={runtimeInterface}
            />
          )
        )}
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
  display: flex;
`;
