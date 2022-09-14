import { Vector3 } from "@react-three/fiber";

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

const TestBox2 = ({ position }: { position: number[] }) => (
  <mesh position={position as Vector3}>
    <boxGeometry args={[5, 5, 5]} />
    <meshStandardMaterial color={"brown"} />
  </mesh>
);

export default TestBox2;
