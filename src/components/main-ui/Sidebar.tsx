import styled from "styled-components";
import { TreeList } from "../tree-list/TreeList";
import { Spacer } from "../Spacer";
import { UIchild } from "../../translators/TemplateToComponents";

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
      {/* <SidebarContainer>
        <Spacer height={20} />
        <TreeList templateChildren={mainTemplate} />
      </SidebarContainer> */}
    </>
  );
};

const SidebarContainer = styled.div`
  width: 300px;
  /* height: 100%; */
  background-color: lightgray;
`;
