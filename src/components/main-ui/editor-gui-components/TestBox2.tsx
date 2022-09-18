import { Vector3 } from "@react-three/fiber";
import { useMemo } from "react";

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
      <mesh position={position as Vector3}>
        <boxGeometry args={args as any} />
        {/* TODO  HARD CODED */}
        <meshStandardMaterial color={"brown"} />
      </mesh>
    ),
    [position, args]
  );
};

export default TestBox2;
