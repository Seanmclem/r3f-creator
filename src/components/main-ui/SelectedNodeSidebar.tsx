/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Spacer } from "../Spacer";
import { useTemplateStore } from "../../stores/templateStore";
import { StandardContainer } from "../styled-components";
import { sendNodeUpdate } from "../../functions/editor-tree-functions";
import { useEffect, useRef, useState } from "react";
import { PropEditingSwitch } from "./components/PropEditingSwitch";
import { useSendNodeUpdate } from "../../hooks/useSendNodeUpdate";
import { whatAreTheseTYPES } from "../../functions/type-utils";
import { useElementBoundingRect } from "../../hooks/useElementBoundingRect";
import { useWindowSizeStore } from "../../stores/WindowSizeStore";

interface KeyValueProp {
  key: string;
  value: string;
}

interface props {}

export const SelectedNodeSidebar: React.FC<props> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const selectedNode = useTemplateStore((state) => state.selectedNode);

  // useElementBoundingRect(ref, selectedNode, "SECONDARY");

  const selectedNodeAddress = useTemplateStore(
    (state) => state.selectedNodeAddress
  );

  if (!selectedNode || !selectedNodeAddress) {
    return null;
  }

  console.log("here");
  const poop = whatAreTheseTYPES(selectedNode.tagName);
  console.log({ poop });

  return (
    <SidebarContainer ref={ref}>
      <Spacer height={20} />
      <StandardContainer>
        <div>{selectedNode.tagName}</div>
        {/* new sidebar, and contents, needs dedicated components(s) */}
        <ul>
          {selectedNode.props
            ? Object.keys(selectedNode.props).map((key) => (
                <li key={key}>
                  {/* <span>
                    {key} : {JSON.stringify(selectedNode.props[key])}
                  </span>{" "} */}
                  {/* ... */}
                  <PropEditingSwitch
                    propKey={key}
                    propValue={selectedNode.props[key]}
                  />
                </li>
              ))
            : null}
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
`;
