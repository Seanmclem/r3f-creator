import { PivotControls } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExtrudeGeometry, Matrix4, Object3D, Shape, Vector2 } from "three";
import { useSnapshot } from "valtio";
import { usePositionGizmo } from "../../../../hooks/usePositionGizmo";
import { useSelectComponent } from "../../../../hooks/useSelectComponent";
import { editorNodeState } from "../../../../stores/editorNodeProxy";
import {
  xyz_TemplatesArray,
  xy_TemplatesArray,
} from "../../../../utils/generic_utils";
import { RuntimeInterface } from "../../SelectedNodeSidebar";

class PrismGeometry extends ExtrudeGeometry {
  constructor(vertices: Vector2[], width: number) {
    super(new Shape(vertices), { depth: width, bevelEnabled: false });
  }
}

// perspective described as tapered-down-towards you

////var bottomBack_depthHeight = new Vector2(0, 0); //(depth-towards-position of bottom-back, height-position of bottom-back)
////var bottomFront_depthHeight = [5, 0]; // (depth-towards-position of bottom-front...higher=more-towards-you, height-position of bottom-front...higher=more-off-ground)
////var topBack_depthHeight = [0, 5]; //(depth-towards-position of top-back, height-position of top-back)

var width = 10; // overall shapes-width

////////////////////////////

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
    propName: "bottomBack_depthHeight",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xy_TemplatesArray, // 2-dim
    },
    optional: true,
  },
  {
    propName: "bottomFront_depthHeight",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xy_TemplatesArray, // 2-dim
    },
    optional: true,
  },
  {
    propName: "topBack_depthHeight",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xy_TemplatesArray, // 2-dim
    },
    optional: true,
  },

  {
    propName: "rotation",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
      // steps: { x: 3.12284528383 },
    },
    optional: true,
  },

  {
    propName: "color",
    typeData: {
      type: "STRING",
    },
    optional: true,
  },
];

///////////////

const PrismTriangle = ({
  idx, //custom
  uid, // custom
  nodeItem, // custom
  //
  color,
  position,
  rotation,
  bottomBack_depthHeight,
  bottomFront_depthHeight,
  topBack_depthHeight,
}: {
  idx: number; // custom
  uid: string; // custom
  nodeItem: any; // custom
  //
  color: string;
  position: number[];
  rotation: number[];
  //
  bottomBack_depthHeight: number[];
  bottomFront_depthHeight: number[];
  topBack_depthHeight: number[];
}) => {
  const meshRef = useRef<Object3D>(null);

  const editorNodeStateObject = useSnapshot(editorNodeState);
  const specificNode = editorNodeStateObject[uid];

  console.log({ bottomBack_depthHeight });

  let geometry = new PrismGeometry(
    [
      new Vector2(bottomBack_depthHeight[0], bottomBack_depthHeight[1]),
      new Vector2(bottomFront_depthHeight[0], bottomFront_depthHeight[1]),
      new Vector2(topBack_depthHeight[0], topBack_depthHeight[1]),
    ],
    width
  );

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
      // disableRotations
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
        geometry={geometry}
        scale={1}
        rotation={moving_rotation || rotation}
        position={moving_position || position}
        onClick={handle_select_component}
      >
        <meshLambertMaterial color={color} />
      </mesh>
    </PivotControls>
  );
};

export default PrismTriangle;
