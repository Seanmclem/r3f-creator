import styled from "styled-components";
import { TreeList } from "../tree-list/TreeList";
import { Spacer } from "../Spacer";
import { UIchild } from "../../translators/TemplateToComponents";
import { useTemplateStore } from "../../stores/templateStore";
import { StandardContainer } from "../styled-components";

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
          <StandardContainer>
            <div>{selectedNode.tagName}</div>
            {/* new sidebar, and contents, needs dedicated components(s) */}
            <ul>
              {selectedNode.props
                ? Object.keys(selectedNode.props).map((key) => (
                    <li>
                      {key} : {JSON.stringify(selectedNode.props[key])}
                    </li>
                  ))
                : null}
            </ul>
          </StandardContainer>
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
