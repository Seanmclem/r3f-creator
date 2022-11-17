import { Box } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

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
  <RigidBody position={position as Vector3} rotation={rotation as Euler}>
    <Box args={dimensions as any}>
      <meshStandardMaterial color={color} />
    </Box>
  </RigidBody>
);
