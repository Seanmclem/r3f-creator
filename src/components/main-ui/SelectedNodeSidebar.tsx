/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Spacer } from "../Spacer";
import { useTemplateStore } from "../../stores/templateStore";
import { StandardContainer } from "../styled-components";
import { useEffect, useRef, useState } from "react";
import { PropInputsSwitch } from "./sidebar-components/PropInputsSwitch";
import { editorNodeState } from "../../stores/editorNodeProxy";

interface props {}

export const SelectedNodeSidebar: React.FC<props> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const selectedNode = useTemplateStore((state) => state.selectedNode);
  const selectedRef = useRef<any>(null);
  // const editorNodeStateObject = useSnapshot(editorNodeState);

  const [runtimeInterfaces, setruntimeInterfaces] = useState<any>([]);

  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );

  useEffect(() => {
    if (selectedNode?.tagName === "Fragment") {
      setruntimeInterfaces([]);
      return;
    }
    if (selectedNode && selectedNodeAddress) {
      selectedRef.current = selectedNode;
      import(
        `../main-ui/editor-gui-components/editor/${selectedNode.tagName}`
      ).then(({ runtimeInterfaces }) => {
        if (runtimeInterfaces) {
          setruntimeInterfaces(runtimeInterfaces);
        } else {
          setruntimeInterfaces([]);
        }
        // console.log("runtimeInterfaces", runtimeInterfaces);
      });

      if (!editorNodeState[selectedNode.id]) {
        editorNodeState[selectedNode.id] = {
          uid: selectedNode.id,
          isSelected: true,
          showPivotControls: true,
        };
      } else {
        editorNodeState[selectedNode.id].isSelected = true;
        editorNodeState[selectedNode.id].showPivotControls = true;
      }
    }

    return () => {
      if (selectedRef.current?.id) {
        editorNodeState[selectedRef.current.id].isSelected = false;
        editorNodeState[selectedRef.current.id].showPivotControls = false;
      }
    };
  }, [selectedNode, selectedNodeAddress]);

  if (!selectedNode || !selectedNodeAddress) {
    return null;
  }

  return (
    <SidebarContainer ref={ref}>
      <Spacer height={20} />
      <StandardContainer>
        <div>{selectedNode.tagName}</div>
        <PropInputsSwitch runtimeInterfaces={runtimeInterfaces} />
      </StandardContainer>
    </SidebarContainer>
  );
};

export interface FieldDefinition {
  key: string;
  type: "number" | "string";
}

export interface TypeData {
  type: "ARRAY" | "STRING";
  fieldDefinitions?: FieldDefinition[];
}

export interface RuntimeInterface {
  propName: string;
  typeData: TypeData;
  optional: boolean;
}

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
