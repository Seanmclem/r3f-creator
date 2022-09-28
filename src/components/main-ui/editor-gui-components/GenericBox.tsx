import { Vector3 } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PivotControls } from "@react-three/drei";
import { FieldDefinition, RuntimeInterface } from "../SelectedNodeSidebar";
import { Euler, Matrix4, Object3D, Vector3 as Vec3 } from "three";
import { useSnapshot } from "valtio";
import { editorNodeState } from "../../../stores/editorNodeProxy";
import { useSendNodeUpdate } from "../../../hooks/useSendNodeUpdate";

const detect_MoveOnly = ({ x, y, z }: { x: number; y: number; z: number }) => {
  let count = 0;
  if (x !== 0) {
    count++;
  }
  if (y !== 0) {
    count++;
  }
  if (z !== 0) {
    count++;
  }
  return count === 1;
};

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

const GenericBox = ({
  uid,
  position,
  dimensions,
  color,
  rotation,
}: {
  uid: string;
  position: number[];
  dimensions: number[];
  rotation: number[];
  color: string;
}) => {
  const meshRef = useRef<Object3D>(null);
  const [newPosition, setNewPosition] = useState<Vector3>();
  const [newRotation, setNewRotation] = useState<number[]>();
  const editorNodeStateObject = useSnapshot(editorNodeState);
  const specificNode = editorNodeStateObject[uid];

  const sendNodeUpdate = useSendNodeUpdate();

  useEffect(() => {
    // onDragEnd, position will get updated, newPosition-override will be cleared
    setNewPosition(undefined);
  }, [position]);

  useEffect(() => {
    // onDragEnd, rotation will get updated, newRotation-override will be cleared
    setNewRotation(undefined);
  }, [rotation]);

  const handle_onDragEnd = useCallback(() => {
    // LATER.. could keep a history in-store, for like, ctrl Z?

    if (newPosition) {
      sendNodeUpdate({
        key: "position",
        value: newPosition,
      });
    }

    if (newRotation) {
      sendNodeUpdate({
        key: "rotation",
        value: newRotation,
      });
    }
  }, [newPosition, newRotation, sendNodeUpdate]);

  const handle_onDrag = useCallback(
    (matrix: Matrix4) => {
      // create empty vector
      const vec = new Vec3();

      // set vector to data from matrix
      vec.setFromMatrixPosition(matrix);

      // apply positions from vector, to actual position prop
      if (detect_MoveOnly(vec)) {
        let x = position[0] + vec.x;
        let y = position[1] + vec.y;
        let z = position[2] + vec.z;
        setNewPosition([x, y, z]);
      } else {
        // else apply rotations from matrix
        const euler = new Euler();
        euler.setFromRotationMatrix(matrix);
        if (meshRef.current) {
          // onDragStart => maybe grab, set, and add INITIAL-rotation on each onDrag. Won't compound it.
          setNewRotation([
            euler.x || meshRef?.current?.rotation.x,
            euler.y || meshRef?.current?.rotation.y,
            euler.z || meshRef?.current?.rotation.z,
          ]);
        }
      }
    },
    [position]
  );

  const handle_onDragStart = useCallback(() => {
    // onDragStart => maybe grab, set, and add INITIAL/PRIOR-rotation on each onDrag. Won't compound it.
  }, []);

  return useMemo(
    () => (
      <>
        <PivotControls
          depthTest={false}
          autoTransform={false}
          scale={3}
          anchor={[-0.25, 1.2, -0.25]}
          onDragStart={handle_onDragStart} //, maybe grab, set, and apply initial rotation on each onDrag. Won't compound it.
          onDragEnd={handle_onDragEnd}
          onDrag={handle_onDrag}
          visible={!!specificNode?.showPivotControls}
        >
          <mesh
            ref={meshRef}
            rotation={newRotation || rotation}
            position={newPosition || (position as Vector3)}
          >
            <boxGeometry args={dimensions as any} />
            {/* TODO pass in ROTATION, to array */}
            <meshStandardMaterial color={color || "brown"} />
          </mesh>
        </PivotControls>
      </>
    ),
    [
      position,
      newPosition,
      rotation,
      newRotation,
      dimensions,
      color,
      handle_onDragStart,
      handle_onDrag,
      handle_onDragEnd,
      specificNode?.showPivotControls,
    ] // <-- rotation needed
  );
};

export const GenericBoxLIVE = ({
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