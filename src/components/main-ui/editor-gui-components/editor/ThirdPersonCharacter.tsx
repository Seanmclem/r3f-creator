import { PivotControls } from "@react-three/drei";
import { useCallback, useRef } from "react";
import { Matrix4, Object3D } from "three";
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

  {
    propName: "rotation",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },
];

const ThirdPersonCharacter = ({
  idx, //custom
  uid, // custom
  nodeItem, // custom
  //
  position,
  rotation,
}: {
  idx: number; // custom
  uid: string; // custom
  nodeItem: any; // custom
  //
  position: number[];
  rotation: number[];
}) => {
  const meshRef = useRef<Object3D>(null);

  const editorNodeStateObject = useSnapshot(editorNodeState);
  const specificNode = editorNodeStateObject[uid];

  const { handle_select_component } = useSelectComponent({ idx, nodeItem });

  const {
    moving_position,
    handle_onDragEnd_rotation_AND_position,
    handle_onDrag_both,
    moving_rotation,
  } = usePositionGizmo(position, rotation);

  const handle_onDrag = useCallback(
    (matrix: Matrix4) => {
      handle_onDrag_both(matrix, meshRef);
    },
    [handle_onDrag_both]
  );

  return (
    <PivotControls
      depthTest={false}
      autoTransform={false}
      disableRotations
      scale={3}
      anchor={[0, 0, 0]}
      //onDragStart={handle_onDragStart} //, maybe grab, set, and apply initial rotation on each onDrag. Won't compound it.
      onDragEnd={handle_onDragEnd_rotation_AND_position}
      onDrag={handle_onDrag}
      visible={!!specificNode?.showPivotControls}
      disableSliders
    >
      <mesh
        ref={meshRef}
        position={moving_position || position}
        rotation={moving_rotation || rotation}
        //   scale={[1, 1, 1]}
        onClick={handle_select_component}
      >
        <capsuleGeometry attach="geometry" args={[2, 4, 4, 8]} />
        <meshBasicMaterial attach="material" color={"lightblue"} />
      </mesh>
    </PivotControls>
  );
};

export default ThirdPersonCharacter;
