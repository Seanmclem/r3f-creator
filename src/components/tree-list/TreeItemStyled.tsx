import styled from "styled-components";

export const TreeItem = styled.div<{ selected?: boolean }>`
  margin: 5px;
  padding: 10px;
  background-color: ${({ selected }) => (selected ? "#80a9e244" : "white")};
  border: ${({ selected }) => (selected ? "1px solid black" : "none")};
  border-radius: 10px;
  cursor: pointer;
`;

export const AddNew = styled(TreeItem)`
  background-color: transparent;
  border: 1px dotted black;
  text-align: center;
`;
