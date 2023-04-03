import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useKeyListeners, useMovement } from "../hooks/character-hooks";

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  const pressedKeys = useKeyListeners();

  const [distance, setDistance] = useState(2.5);

  // CAMERA END

  const character_ref = useRef<THREE.Group>(null);

  const camera_ref = useRef<THREE.PerspectiveCamera>(null);
  const horizontal_box_ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );

  useMovement({
    pressedKeys,
    character_ref,
    camera_ref,
    horizontal_box_ref,
  });

  return (
    <group
      ref={character_ref}
      position={position}
      rotation={rotation}
      scale={3}
    >
      {/* thanks chat gpt, for a little help */}
      {/*  */}\
      <mesh ref={horizontal_box_ref}>
        <PerspectiveCamera
          ref={camera_ref}
          makeDefault={true}
          position={[0, 1.5, -distance]}
          fov={75}
        />
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial attach="material" color="red" wireframe={true} />
      </mesh>
      {/* // */}
      <mesh>
        <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial attach="material" color="orange" />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
      </mesh>
    </group>
  );
};
