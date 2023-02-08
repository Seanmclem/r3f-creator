import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { ExporterTwo } from "../exporter-two/ExporterTwo";

import { Button } from "@mantine/core";
import { Spacer } from "../Spacer";
import { SaveToTemplateBtn } from "./SaveToTemplateBtn";
import { useBackwardInHistory } from "../../stores/historyStore";

Modal.setAppElement("#root");

interface props {}

export const TopBar: React.FC<props> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { go_back_in_history } = useBackwardInHistory();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "140px",
            left: "140px",
            right: "140px",
            bottom: "140px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <button onClick={toggleModal}>Close</button>
        {isOpen && <ExporterTwo />}
      </Modal>
      <Container>
        <Spacer width={20} />
        <Button
          size="xs"
          onClick={() => go_back_in_history()}
          style={{ height: "75%", marginTop: 3 }}
        >
          Undo
        </Button>
        <Spacer width={10} />
        <Button
          size="xs"
          onClick={() => null}
          style={{ height: "75%", marginTop: 3 }}
        >
          Redo
        </Button>
        <Spacer width={40} />
        <Button
          size="xs"
          onClick={toggleModal}
          style={{ height: "75%", marginTop: 3 }}
        >
          Export
        </Button>
        <Spacer width={20} />
        <SaveToTemplateBtn />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  height: 35px;
  width: 100%;
  background-color: gray;
`;

// const Button = styled.button`
//   margin-top: 5px;
//   margin-bottom: 5px;
// `;

const TheModal = styled(Modal)`
  height: 50%;
  width: 50%;
`;
