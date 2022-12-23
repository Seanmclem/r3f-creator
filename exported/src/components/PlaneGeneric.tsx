import { RigidBody } from "@react-three/rapier";

export const PlaneGeneric = ({
  position,
  dimensions,
  color,
}: // rotation,
{
  position: number[];
  dimensions: number[];
  // rotation: number[];
  color: string;
}) => (
  <RigidBody>
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      //   scale={[1, 1, 1]}
    >
      <planeBufferGeometry
        attach="geometry"
        args={dimensions as [number, number]}
      />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  </RigidBody>
);
