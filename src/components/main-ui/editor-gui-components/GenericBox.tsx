import { Vector3 } from "@react-three/fiber";
import { useMemo } from "react";
import { PivotControls } from "@react-three/drei";
import { FieldDefinition, RuntimeInterface } from "../SelectedNodeSidebar";

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
  return useMemo(
    () => (
      // has useMemo, useless?

      // APPEARS RELATIVE TO THE ORIGIN? Not the thing

      // use on-drag-end, update position from ref
      // I think, I can use a global signal, containing an object, with keys that are ID of the node...
      // declare ref here, on first useEffect, set it to global signal,
      // selectedNode Sidebar imports ref lazy/dynamically, get updates from the ref ...

      // OR just use signal/ZUSTAND for the actual position data,
      // OR store refs in zustand, on an object based on the uuid of component, onDragEnd, do last updated.
      // Abstract to pivot controls component, takes "updatedProps" array, conpares to pros on ref

      // A store would be good because, it could keep a history, for like, ctrl Z?

      <PivotControls scale={3} anchor={[-0.25, 1.2, -0.25]}>
        <mesh position={position as Vector3}>
          <boxGeometry args={dimensions as any} />
          {/* TODO pass in ROTATION, to array */}
          <meshStandardMaterial color={color || "brown"} />
        </mesh>
      </PivotControls>
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
