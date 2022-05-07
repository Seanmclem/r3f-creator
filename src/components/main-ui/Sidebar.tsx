import styled from "styled-components";
import { TreeList } from "../tree-list/TreeList";
import { Spacer } from "../Spacer";
import { UIchild } from "../../translators/TemplateToComponents";
import { useTemplateStore } from "../../stores/templateStore";

interface props {
  mainTemplate: UIchild[];
}

/** Left-side, main */
export const Sidebar: React.FC<props> = ({ mainTemplate }) => {
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  return (
    <>
      <SidebarContainer>
        <Spacer height={20} />
        <TreeList templateChildren={mainTemplate} />
      </SidebarContainer>
      {selectedNode ? (
        <SidebarContainer>
          <Spacer height={20} />
          <div>{selectedNode.tagName}</div>
        </SidebarContainer>
      ) : null}
    </>
  );
};

const SidebarContainer = styled.div`
  width: 300px;
  /* height: 100%; */
  background-color: lightgray;
`;
