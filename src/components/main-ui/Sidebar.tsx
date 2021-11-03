import styled from "styled-components";

export const Sidebar: React.FC<{}> = () => {
  return <SidebarContainer></SidebarContainer>;
};

const SidebarContainer = styled.div`
  width: 300px;
  /* height: 100%; */
  background-color: green;
`;
