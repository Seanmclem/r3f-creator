import styled from "styled-components";
import { Spacer } from "../Spacer";
import { useTemplateStore } from "../../stores/templateStore";
import { StandardContainer } from "../styled-components";
import { sendNodeUpdate } from "../../functions/editor-tree-functions";

interface props {}

export const SelectedNodeSidebar: React.FC<props> = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );

  const selectedNode = useTemplateStore((state) => state.selectedNode);

  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );

  if (!selectedNode || !selectedNodeAddress) {
    return null;
  }
  const update = {
    // there's code in the loop to only update color...
    key: "color",
    value: "purple",
  };
  const handlePress = () => {
    sendNodeUpdate({
      nodeAddress: selectedNodeAddress,
      mainTemplate,
      updateMainTemplate,
      update,
    });
  };
  return (
    <SidebarContainer>
      <Spacer height={20} />
      <StandardContainer>
        <div>{selectedNode.tagName}</div>
        {/* new sidebar, and contents, needs dedicated components(s) */}
        <ul>
          {selectedNode.props
            ? Object.keys(selectedNode.props).map((key) => (
                <li key={key} onClick={handlePress}>
                  {key} : {JSON.stringify(selectedNode.props[key])}
                </li>
              ))
            : null}
        </ul>
      </StandardContainer>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 300px;
  /* height: 100%; */
  background-color: lightgray;
  border-left: 2px solid #80a9e299;
`;
