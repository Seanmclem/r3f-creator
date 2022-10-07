import { Euler, Vector3 } from "@react-three/fiber";

export const GenericBox = ({
  position,
  dimensions,
  color,
  rotation,
}: {
  position: number[];
  dimensions: number[];
  rotation: number[];
  color: string;
}) => (
  <mesh position={position as Vector3} rotation={rotation as Euler}>
    <boxGeometry args={dimensions as any} />
    <meshStandardMaterial color={color} />
  </mesh>
);
