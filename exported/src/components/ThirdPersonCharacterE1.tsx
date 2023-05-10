import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useKeyListeners } from "../hooks/character-hooks";

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  // MOVEMENT START
  const pressedKeys = useKeyListeners();

  const character_ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );
  const camera_ref = useRef<THREE.PerspectiveCamera>(null);

  const following_mesh_ref = useRef<THREE.Mesh>(null);

  const prev_position_ref = useRef(position);

  const targetRotationRef = useRef(new THREE.Quaternion());

  const currentRotationRef = useRef(new THREE.Quaternion());

  const [{ cameraDistance, cameraHeight }, set] = useControls(() => ({
    cameraDistance: 3.5,
    cameraHeight: 2.5,
    currentAngle: 0,
    movementAngle: 0,
  }));

  // Use useFrame to update the camera position and lookAt
  useFrame((_, delta) => {
    if (
      !character_ref.current ||
      !camera_ref.current ||
      !following_mesh_ref.current
    ) {
      return;
    }

    // console.log("delta", delta);

    const movementSpeed = parseFloat(delta.toFixed(2)) * 9; // Adjust this value to control the character's movement speed
    // const movementSpeed = 0.1;
    // console.log("movementSpeed", movementSpeed);
    // const rotationSpeed = 0.03;
    const rotationSpeed = parseFloat(delta.toFixed(2)) * 3; // Adjust this value to control the character's rotation speed
    // console.log("rotationSpeed", rotationSpeed);

    const character = character_ref.current;
    const camera = camera_ref.current;
    const following_mesh = following_mesh_ref.current;

    // Move forward
    if (pressedKeys.current.has("w")) {
      const z_change = Math.cos(character.rotation.y) * movementSpeed;
      const x_change = Math.sin(character.rotation.y) * movementSpeed;

      character.position.z += z_change;
      character.position.x += x_change;

      following_mesh.position.z += z_change;
      following_mesh.position.x += x_change;
    }
    // Move backward
    if (pressedKeys.current.has("s")) {
      const z_change = Math.cos(character.rotation.y) * movementSpeed;
      const x_change = Math.sin(character.rotation.y) * movementSpeed;

      character.position.z -= z_change;
      character.position.x -= x_change;

      following_mesh.position.z -= z_change;
      following_mesh.position.x -= x_change;
    }
    // Move left
    if (pressedKeys.current.has("a")) {
      const z_change = Math.sin(character.rotation.y) * movementSpeed;
      const x_change = Math.cos(character.rotation.y) * movementSpeed;

      character.position.z -= z_change;
      character.position.x += x_change;

      following_mesh.position.z -= z_change;
      following_mesh.position.x += x_change;
    }
    // Move right
    if (pressedKeys.current.has("d")) {
      const z_change = Math.sin(character.rotation.y) * movementSpeed;
      const x_change = Math.cos(character.rotation.y) * movementSpeed;

      character.position.z += z_change;
      character.position.x -= x_change;

      following_mesh.position.z += z_change;
      following_mesh.position.x -= x_change;
    }

    // now make heirght position match
    following_mesh.position.y = character.position.y + 1;

    //   follower_box_ref.position.y =
    // character_mesh_ref.position.y + follower_height;

    // Turn character left
    if (pressedKeys.current.has("ArrowLeft")) {
      character.rotation.y += rotationSpeed;
      // following_mesh.rotation.y += rotationSpeed;
    }
    // Turn character right
    if (pressedKeys.current.has("ArrowRight")) {
      character.rotation.y -= rotationSpeed;
      // following_mesh.rotation.y -= rotationSpeed;
    }

    const pressing_any_WASD =
      pressedKeys.current.has("w") ||
      pressedKeys.current.has("a") ||
      pressedKeys.current.has("s") ||
      pressedKeys.current.has("d");

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
    // ^ the most important line of code in this file
    ///
    //

    // smooth rotation START

    if (!pressing_any_WASD) {
      return;
    }

    // character_ref.setRotationFromEuler(newRotation);

    const direction = new THREE.Vector3()
      .copy(following_mesh_ref.current.position)
      .sub(prev_position_ref.current)
      .normalize();

    // Check if the direction vector is parallel to the up vector
    if (Math.abs(direction.dot(new THREE.Vector3(0, 1, 0))) < 0.99) {
      // Calculate the target rotation
      targetRotationRef.current.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction
      );

      // Interpolate the rotation
      currentRotationRef.current.slerp(targetRotationRef.current, 0.1);

      following_mesh_ref.current.quaternion.copy(currentRotationRef.current);
    } else {
      // Set the target rotation to the current rotation without tweening
      following_mesh_ref.current.quaternion.copy(targetRotationRef.current);
      currentRotationRef.current.copy(targetRotationRef.current);
    }

    prev_position_ref.current = following_mesh_ref.current.position.clone();
    // smooth rotation end
  });
  return (
    <>
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
          <meshBasicMaterial color="green" wireframe={true} />
        </mesh>
      </group>

      <mesh ref={following_mesh_ref}>
        <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial attach="material" color="orange" />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
      </mesh>
    </>
  );
};
