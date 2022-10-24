import React from "react";
import styled from "styled-components";
import { RuntimeInterface } from "../../SelectedNodeSidebar";
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
            <ArrayFieldContainer
              key={fieldDefinition.key}
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

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 8px;
  padding-left: 8px;
  /* font-weight: bold; */
  font-size: 110%;
  letter-spacing: 0.5px;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 5px;
  margin-bottom: 10px;
`;

const Body = styled.div`
  padding: 5px;
  padding-top: 0;
  display: flex;
`;
