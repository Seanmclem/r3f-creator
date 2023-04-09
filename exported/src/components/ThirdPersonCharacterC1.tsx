import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  // MOVEMENT START
  const pressedKeys = useRef(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    pressedKeys.current.add(event.key);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    pressedKeys.current.delete(event.key);
  };

  // Add keydown and keyup event listeners
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const character_ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );
  const camera_ref = useRef<THREE.PerspectiveCamera>(null);

  const { cameraDistance, cameraHeight } = useControls({
    cameraDistance: 3.5,
    cameraHeight: 2.5,
  });

  // Use useFrame to update the camera position and lookAt
  useFrame(() => {
    if (!character_ref.current || !camera_ref.current) {
      return;
    }

    const movementSpeed = 0.1; // Adjust this value to control the character's movement speed
    const rotationSpeed = 0.03; // Adjust this value to control the character's rotation speed

    const character = character_ref.current;
    const camera = camera_ref.current;

    // Move forward
    if (pressedKeys.current.has("w")) {
      character.position.z += Math.cos(character.rotation.y) * movementSpeed;
      character.position.x += Math.sin(character.rotation.y) * movementSpeed;
    }
    // Move backward
    if (pressedKeys.current.has("s")) {
      character.position.z -= Math.cos(character.rotation.y) * movementSpeed;
      character.position.x -= Math.sin(character.rotation.y) * movementSpeed;
    }
    // Move left
    if (pressedKeys.current.has("a")) {
      character.position.z -= Math.sin(character.rotation.y) * movementSpeed;
      character.position.x += Math.cos(character.rotation.y) * movementSpeed;
    }
    // Move right
    if (pressedKeys.current.has("d")) {
      character.position.z += Math.sin(character.rotation.y) * movementSpeed;
      character.position.x -= Math.cos(character.rotation.y) * movementSpeed;
    }

    // Turn character left
    if (pressedKeys.current.has("ArrowLeft")) {
      character.rotation.y += rotationSpeed;
    }
    // Turn character right
    if (pressedKeys.current.has("ArrowRight")) {
      character.rotation.y -= rotationSpeed;
    }

    // Update camera position and lookAt
    const cameraPosition = new THREE.Vector3(0, cameraHeight, -cameraDistance);
    cameraPosition.applyQuaternion(character.quaternion);
    cameraPosition.add(character.position);
    camera.position.copy(cameraPosition);

    // Calculate the center of the character mesh
    const characterCenter = new THREE.Vector3();
    character.geometry.computeBoundingBox();
    character.geometry.boundingBox &&
      character.geometry.boundingBox.getCenter(characterCenter);
    characterCenter.applyMatrix4(character.matrixWorld);

    // Set the camera's lookAt target to the center of the character mesh
    camera.lookAt(characterCenter);
  });
  return (
    <group position={position} rotation={rotation}>
      <PerspectiveCamera
        ref={camera_ref}
        makeDefault={true}
        // position={[0, 15.5, -distance]}
        fov={75}
        // matrixWorldAutoUpdate={undefined}
        // getObjectsByProperty={undefined}
      />
      <mesh ref={character_ref}>
        <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial attach="material" color="orange" />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
      </mesh>
    </group>
  );
};
