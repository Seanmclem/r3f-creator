import styled from "styled-components";
import { TreeList } from "../tree-list/TreeList";
import { Spacer } from "../Spacer";
import { UIchild } from "../../translators/TemplateToComponents";

import { SelectedNodeSidebar } from "./SelectedNodeSidebar";

interface props {
  mainTemplate: UIchild[];
}

/** Left-side, main */
export const Sidebar: React.FC<props> = ({ mainTemplate }) => {
  return (
    <>
      <SidebarContainer>
        <Spacer height={20} />
        <TreeList templateChildren={mainTemplate} />
      </SidebarContainer>

      <SelectedNodeSidebar />
    </>
  );
};

const SidebarContainer = styled.div`
  width: 300px;
  /* height: 100%; */
  background-color: lightgray;
  padding-right: 15px;
`;
