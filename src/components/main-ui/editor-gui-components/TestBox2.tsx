import { Vector3 } from "@react-three/fiber";
import { useMemo } from "react";
import { PivotControls } from "@react-three/drei";

const xyz_TemplatesArray = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

export const runtimeInterfaces = [
  {
    propName: "position",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },

  {
    propName: "args",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },
];

const TestBox2 = ({
  position,
  args,
}: {
  position: number[];
  args: number[];
}) => {
  return useMemo(
    () => (
      // has useMemo, useless?

      // use on-drag-end, update position from ref
      // I think, I can use a global signal, containing an object, with keys that are ID of the node...
      // declare ref here, on first useEffect, set it to global signal,
      // selectedNode Sidebar imports ref lazy/dynamically, get updates from the ref ...

      // OR just use signal/ZUSTAND for the actual position data,
      // OR store refs in zustand, on an object based on the uuid of component, onDragEnd, do last updated.
      // Abstract to pivot controls component, takes "updatedProps" array, conpares to pros on ref

      // A store would be good because, it could keep a history, for like, ctrl Z?

      <PivotControls>
        <mesh position={position as Vector3}>
          <boxGeometry args={args as any} />
          {/* TODO  HARD CODED color */}
          <meshStandardMaterial color={"brown"} />
        </mesh>
      </PivotControls>
    ),
    [position, args]
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

export default TestBox2;
