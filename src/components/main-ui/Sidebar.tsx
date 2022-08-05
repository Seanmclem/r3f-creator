import styled from "styled-components";
import { TreeList } from "../tree-list/TreeList";
import { Spacer } from "../Spacer";
import { UIchild } from "../../translators/TemplateToComponents";

import { SelectedNodeSidebar } from "./SelectedNodeSidebar";
// import { useRef } from "react";
// import { useElementBoundingRect } from "../../hooks/useElementBoundingRect";

interface props {
  mainTemplate: UIchild[];
}

/** Left-side, main */
export const Sidebar: React.FC<props> = ({ mainTemplate }) => {
  // const ref = useRef<HTMLDivElement | null>(null);
  // useElementBoundingRect(ref, mainTemplate, "SECONDARY");

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
  min-width: 300px;
  /* height: 100%; */
  background-color: lightgray;
  padding-right: 15px;
`; // 300+15 = 315
