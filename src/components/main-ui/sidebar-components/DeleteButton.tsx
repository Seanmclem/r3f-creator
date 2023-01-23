import { Button } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";
import { useTemplateStore } from "../../../stores/templateStore";
import { UIchild } from "../../../translators/TemplateToComponents";

interface props {
  //   selectedNode: UIchild;
}

export const DeleteButton: React.FC<props> = () => {
  const { handleDelete } = useSendNodeUpdate();

  const updateSelectedNode = useTemplateStore(
    (state) => state.updateSelectedNode
  );
  const updateSelectedNodeAddress = useTemplateStore(
    (state) => state.updateSelectedNodeAddress
  );

  const handleDeleteClick = () => {
    updateSelectedNode(undefined);
    updateSelectedNodeAddress(undefined);
    handleDelete();
  };

  return (
    <Container>
      <Button color="red" onClick={handleDeleteClick}>
        Delete
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
`;
