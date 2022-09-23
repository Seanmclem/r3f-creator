import { Vector3 } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PivotControls } from "@react-three/drei";
import { FieldDefinition, RuntimeInterface } from "../SelectedNodeSidebar";
import { Euler, Matrix4, Object3D } from "three";

const xyz_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

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
    propName: "color",
    typeData: {
      type: "STRING",
      // fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },
];

const GenericBox = ({
  position,
  dimensions,
  color,
}: {
  position: number[];
  dimensions: number[];
  color: string;
}) => {
  const meshRef = useRef<Object3D>(null);
  const handle_onDragEnd = () => {
    // can't render separately.. Will need to call useSendNodeUpdate directly from here
    // apply transforms directly, as below.
    // Then, onDragEnd, update actual object via useSendNodeUpdate
    // need to control hide/show of Gizmo
    // LATER.. could keep a history, for like, ctrl Z?
  };

  const handle_onDrag = (matrix: Matrix4) => {
    meshRef?.current?.rotation.setFromRotationMatrix(matrix);
    // need to get other controls also, position, mostly.

    // matrix.decompose(poo, hat, fork)
    // meshRef?.current?.position.decompo
  };

  return useMemo(
    () => (
      <>
        <PivotControls
          depthTest={false}
          autoTransform={false}
          scale={3}
          anchor={[-0.25, 1.2, -0.25]}
          onDragEnd={handle_onDragEnd}
          onDrag={handle_onDrag}
        >
          <mesh ref={meshRef} position={position as Vector3}>
            <boxGeometry args={dimensions as any} />
            {/* TODO pass in ROTATION, to array */}
            <meshStandardMaterial color={color || "brown"} />
          </mesh>
        </PivotControls>
      </>
    ),
    [position, dimensions, color] // <-- rotation needed
  );
};

export const TextBox2LIVE = ({
  position,
  args,
}: {
  position: number[];
  args: number[];
}) => (
  <mesh position={position as Vector3}>
    <boxGeometry args={args as any} />
    <meshStandardMaterial color={"brown"} />
  </mesh>
);

export default GenericBox;
