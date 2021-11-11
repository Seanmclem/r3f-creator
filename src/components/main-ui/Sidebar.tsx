import styled from "styled-components";
import { TreeList } from "../tree-list/TreeList";
import { basicCanvas1 } from "../../templates/canvas-templates";
import { Spacer } from "../Spacer";

export const Sidebar: React.FC<{}> = () => {
  return (
    <SidebarContainer>
      <Spacer height={20} />
      <TreeList templateChildren={basicCanvas1} />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 300px;
  /* height: 100%; */
  background-color: lightgray;
`;
