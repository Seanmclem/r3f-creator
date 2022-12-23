import { Vector3 } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { PivotControls } from "@react-three/drei";
import { RuntimeInterface } from "../../SelectedNodeSidebar";
import { Matrix4, Object3D } from "three";
import { useSnapshot } from "valtio";
import { editorNodeState } from "../../../../stores/editorNodeProxy";

import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useSelectComponent } from "../../../../hooks/useSelectComponent";
import { xyz_TemplatesArray } from "../../../../utils/generic_utils";
import { usePositionGizmo } from "../../../../hooks/usePositionGizmo";

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
    propName: "dimensions",
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

  {
    propName: "color",
    typeData: {
      type: "STRING",
      // fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },
];

// v NEEDs to be DEFAULT export, for Lazy import
const GenericBox = ({
  idx, //custom
  uid, // custom
  nodeItem, // custom
  //
  position,
  dimensions,
  color,
  rotation,
}: {
  idx: number; // custome
  uid: string; // custom
  nodeItem: any; // custom
  //
  position: number[];
  dimensions: number[];
  rotation: number[];
  color: string;
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

  return useMemo(
    () => (
      <>
        <PivotControls
          depthTest={false}
          autoTransform={false}
          scale={3}
          anchor={[-0.25, 1.2, -0.25]}
          onDragEnd={handle_onDragEnd_rotation_AND_position}
          onDrag={handle_onDrag}
          visible={!!specificNode?.showPivotControls}
          disableSliders
        >
          <RigidBody
            rotation={moving_rotation || (rotation as any)}
            position={moving_position || (position as Vector3)}
            type="fixed"
          >
            <Box
              ref={meshRef}
              args={dimensions as any}
              onClick={handle_select_component}
            >
              <meshStandardMaterial color={color || "brown"} />
            </Box>
          </RigidBody>
        </PivotControls>
      </>
    ),
    [
      handle_onDragEnd_rotation_AND_position,
      handle_onDrag,
      moving_position,
      position,
      rotation,
      moving_rotation,
      dimensions,
      color,
      specificNode?.showPivotControls,
      handle_select_component,
    ] // <-- rotation needed
  );
};

export default GenericBox;
