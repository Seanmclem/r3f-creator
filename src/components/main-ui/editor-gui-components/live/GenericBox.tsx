import { Box } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

export const GenericBox = ({
  position,
  dimensions,
  color,
  rotation,
  fixed = false,
}: {
  position: number[];
  dimensions: number[];
  rotation: number[];
  color: string;
  fixed?: boolean;
}) => (
  <RigidBody
    position={position as Vector3}
    rotation={rotation as Euler}
    type={fixed ? "fixed" : undefined}
  >
    <Box args={dimensions as any} castShadow>
      <meshPhongMaterial color={color} />
    </Box>
  </RigidBody>
);
