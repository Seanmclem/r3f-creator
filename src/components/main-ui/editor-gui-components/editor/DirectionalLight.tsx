import { PivotControls, useHelper } from "@react-three/drei";
import { useRef } from "react";
import {
  DirectionalLight as DirectionalLightInterface,
  DirectionalLightHelper,
} from "three";
import { useSnapshot } from "valtio";
import { usePositionGizmo } from "../../../../hooks/usePositionGizmo";
import { useSelectComponent } from "../../../../hooks/useSelectComponent";
import { editorNodeState } from "../../../../stores/editorNodeProxy";
import { xyz_TemplatesArray } from "../../../../utils/generic_utils";
import { RuntimeInterface } from "../../SelectedNodeSidebar";

export const runtimeInterfaces: RuntimeInterface[] = [
  {
    propName: "position",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },
];

const DirectionalLight = ({
  idx, //custom
  uid, // custom
  nodeItem, // custom
  //
  position,
  rotation,
}: {
  idx: number; // custome
  uid: string; // custom
  nodeItem: any; // custom
  //
  position: number[];
  rotation: number[];
}) => {
  const editorNodeStateObject = useSnapshot(editorNodeState);
  const specificNode = editorNodeStateObject[uid];

  const { handle_select_component } = useSelectComponent({ idx, nodeItem });

  const { handle_onDragEnd_position, handle_onDrag_position, moving_position } =
    usePositionGizmo(position);

  const directionalLightRef = useRef<DirectionalLightInterface>(null);

  useHelper(directionalLightRef, DirectionalLightHelper, 1, "red");

  return (
    <PivotControls
      depthTest={false}
      autoTransform={false}
      // disableRotations
      disableSliders
      scale={3}
      anchor={[0, 0, 0]}
      //onDragStart={handle_onDragStart} //, maybe grab, set, and apply initial rotation on each onDrag. Won't compound it.
      onDragEnd={handle_onDragEnd_position}
      onDrag={handle_onDrag_position}
      visible={!!specificNode?.showPivotControls}
    >
      <directionalLight
        ref={directionalLightRef}
        position={moving_position || position}
        onClick={handle_select_component}
        intensity={1}
        //
      />
      {/* 
          - Responds to light
          RawShaderMaterial
          ShaderMaterial
          ShadowMaterial
          MeshLambertMaterial
          MeshPhong
          MeshPhysical
          MeshStandard
          MeshToon...

          - Does NOT respond to light
          LineBasicMaterial
          LineDashedMaterial
          MeshBasicMaterial
          MeshDistanceMaterial
          MeshMatcapMaterial
          MeshNormalMaterial
          PointsMaterial
          SpriteMaterial

          Lights
          AmbientLight - Lights up everything everywhere equally
          HemishphereLight - 
          DirectionalLight - like a spot light?
          PointLight - is like a ball of light ?
      */}
    </PivotControls>
  );
};

export default DirectionalLight;
