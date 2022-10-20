import React, { useState } from "react";
import styled from "styled-components";
import { Space } from "../../pages/_OLD_AstTools";
import Modal from "react-modal";
import { Exporter } from "../../pages/Exporter";
import { ExporterTwo } from "../exporter-two/ExporterTwo";

Modal.setAppElement("#root");

interface props {}

export const TopBar: React.FC<props> = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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
        <Space />
        <Button onClick={toggleModal}>Export</Button>
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

const Button = styled.button`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TheModal = styled(Modal)`
  height: 50%;
  width: 50%;
`;
