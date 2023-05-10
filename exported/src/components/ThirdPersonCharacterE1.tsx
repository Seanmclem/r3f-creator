import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useKeyListeners } from "../hooks/character-hooks";

// Objectives Completed:
// 1. make the camera follow the character
// 2. make the character rotate smoothly
// 3. make the character move smoothly
// 4. make the character face the direction it is moving
// 5. make the characters forward direction, and others, be relative to the direction the camera is facing

// Objectives Not Completed:
// 1. make jumping
// 2. make the character have a rigid body colisions etc
// 3. make the character have a custom model and animations
// 4. use hooks to also listen to controller input
// 5. hooks for touch screen input
// 6. unity amoung inputs
// 7. camera controls need to move up and down
// 8. camera will one day need colisions and auto adjusting?

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  // MOVEMENT START
  const pressedKeys = useKeyListeners();

  const follower_mesh_ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );
  const camera_ref = useRef<THREE.PerspectiveCamera>(null);

  const character_mesh_ref = useRef<THREE.Mesh>(null);

  const prev_position_ref = useRef(position);

  const targetRotationRef = useRef(new THREE.Quaternion());

  const currentRotationRef = useRef(new THREE.Quaternion());

  const [{ cameraDistance, cameraHeight }, set] = useControls(() => ({
    cameraDistance: 3.5,
    cameraHeight: 2.5,
    currentAngle: 0,
    movementAngle: 0,
  }));
  const previou_speed_ref = useRef(0);

  // Use useFrame to update the camera position and lookAt
  useFrame((_, delta) => {
    if (
      !follower_mesh_ref.current ||
      !camera_ref.current ||
      !character_mesh_ref.current
    ) {
      return;
    }

    // console.log("delta", delta);

    // const good_delta = delta === 0 ? - previou_delta_ref.current;
    const speed_calc = parseFloat(delta.toFixed(2)) * 9;
    previou_speed_ref.current =
      speed_calc === 0 ? previou_speed_ref.current : speed_calc;

    const movementSpeed = previou_speed_ref.current; // Adjust this value to control the character's movement speed
    // const movementSpeed = 0.1;
    console.log("movementSpeed", movementSpeed);
    console.log("delta", delta);
    // const rotationSpeed = 0.03;
    const rotationSpeed = previou_speed_ref.current / 3; // Adjust this value to control the character's rotation speed
    console.log("rotationSpeed", rotationSpeed);

    const follower_current = follower_mesh_ref.current;
    const camera = camera_ref.current;
    const character_current = character_mesh_ref.current;

    // Move forward
    if (pressedKeys.current.has("w")) {
      const z_change = Math.cos(follower_current.rotation.y) * movementSpeed;
      const x_change = Math.sin(follower_current.rotation.y) * movementSpeed;

      follower_current.position.z += z_change;
      follower_current.position.x += x_change;

      character_current.position.z += z_change;
      character_current.position.x += x_change;
    }
    // Move backward
    if (pressedKeys.current.has("s")) {
      const z_change = Math.cos(follower_current.rotation.y) * movementSpeed;
      const x_change = Math.sin(follower_current.rotation.y) * movementSpeed;

      follower_current.position.z -= z_change;
      follower_current.position.x -= x_change;

      character_current.position.z -= z_change;
      character_current.position.x -= x_change;
    }
    // Move left
    if (pressedKeys.current.has("a")) {
      const z_change = Math.sin(follower_current.rotation.y) * movementSpeed;
      const x_change = Math.cos(follower_current.rotation.y) * movementSpeed;

      follower_current.position.z -= z_change;
      follower_current.position.x += x_change;

      character_current.position.z -= z_change;
      character_current.position.x += x_change;
    }
    // Move right
    if (pressedKeys.current.has("d")) {
      const z_change = Math.sin(follower_current.rotation.y) * movementSpeed;
      const x_change = Math.cos(follower_current.rotation.y) * movementSpeed;

      follower_current.position.z += z_change;
      follower_current.position.x -= x_change;

      character_current.position.z += z_change;
      character_current.position.x -= x_change;
    }

    // now make heirght position match
    character_current.position.y = follower_current.position.y + 1;

    //   follower_box_ref.position.y =
    // character_mesh_ref.position.y + follower_height;

    // Turn character left
    if (pressedKeys.current.has("ArrowLeft")) {
      follower_current.rotation.y += rotationSpeed;
      // following_mesh.rotation.y += rotationSpeed;
    }
    // Turn character right
    if (pressedKeys.current.has("ArrowRight")) {
      follower_current.rotation.y -= rotationSpeed;
      // following_mesh.rotation.y -= rotationSpeed;
    }

    const pressing_any_WASD =
      pressedKeys.current.has("w") ||
      pressedKeys.current.has("a") ||
      pressedKeys.current.has("s") ||
      pressedKeys.current.has("d");

    // Update camera position and lookAt
    const cameraPosition = new THREE.Vector3(0, cameraHeight, -cameraDistance);
    cameraPosition.applyQuaternion(follower_current.quaternion);
    cameraPosition.add(follower_current.position);
    camera.position.copy(cameraPosition);

    // Calculate the center of the character mesh
    const characterCenter = new THREE.Vector3();
    follower_current.geometry.computeBoundingBox();
    follower_current.geometry.boundingBox &&
      follower_current.geometry.boundingBox.getCenter(characterCenter);
    characterCenter.applyMatrix4(follower_current.matrixWorld);

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
      .copy(character_mesh_ref.current.position)
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

      character_mesh_ref.current.quaternion.copy(currentRotationRef.current);
    } else {
      // Set the target rotation to the current rotation without tweening
      character_mesh_ref.current.quaternion.copy(targetRotationRef.current);
      currentRotationRef.current.copy(targetRotationRef.current);
    }

    prev_position_ref.current = character_mesh_ref.current.position.clone();
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
        <mesh ref={follower_mesh_ref}>
          <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="green" wireframe={true} />
        </mesh>
      </group>

      <mesh ref={character_mesh_ref}>
        <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial attach="material" color="orange" />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
      </mesh>
    </>
  );
};
