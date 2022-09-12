/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Spacer } from "../Spacer";
import { useTemplateStore } from "../../stores/templateStore";
import { StandardContainer } from "../styled-components";
import { useEffect, useRef, useState } from "react";
import { PropEditingSwitch } from "./components/PropEditingSwitch";
import { whatAreTheseTYPES } from "../../functions/type-utils";

interface KeyValueProp {
  key: string;
  value: string;
}

interface props {}

export const SelectedNodeSidebar: React.FC<props> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  const [runtimeInterfaces, setruntimeInterfaces] = useState<any>();

  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );

  useEffect(() => {
    if (selectedNode && selectedNodeAddress) {
      import(`../main-ui/editor-gui-components/${selectedNode.tagName}`).then(
        ({ runtimeInterfaces }) => {
          if (runtimeInterfaces) {
            setruntimeInterfaces(setruntimeInterfaces);
          }
          console.log({ runtimeInterfaces });
        }
      );
    }
  }, [selectedNode, selectedNodeAddress]);

  if (!selectedNode || !selectedNodeAddress) {
    return null;
  }

  return (
    <SidebarContainer ref={ref}>
      <Spacer height={20} />
      <StandardContainer>
        <div>{selectedNode.tagName}</div>
        <ul>
          <li>{}</li>
        </ul>
      </StandardContainer>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  /* width: 300px; */
  min-width: 300px;
  width: auto;
  padding: 0 15px;
  /* height: 100%; */
  background-color: lightgray;
  border-left: 2px solid #80a9e299;

  li {
    margin-bottom: 10px;
  }
`;
