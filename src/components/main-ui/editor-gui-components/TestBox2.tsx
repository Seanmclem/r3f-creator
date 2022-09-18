import { Vector3 } from "@react-three/fiber";
import { useMemo } from "react";

const positionTemplatesArray = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

export const runtimeInterfaces = [
  {
    propName: "position",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: positionTemplatesArray,
    },
    optional: true,
  },
];

const TestBox2 = ({ position }: { position: number[] }) => {
  return useMemo(
    () => (
      <mesh position={position as Vector3}>
        <boxGeometry args={[5, 5, 5]} />
        {/* TODO  HARD CODED */}
        <meshStandardMaterial color={"brown"} />
      </mesh>
    ),
    [position]
  );
};

export default TestBox2;
