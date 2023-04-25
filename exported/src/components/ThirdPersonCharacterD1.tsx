import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  // MOVEMENT START
  const pressed_keys = useRef(new Set());

  const handle_key_down = (event: KeyboardEvent) => {
    pressed_keys.current.add(event.key);
  };

  const handle_key_up = (event: KeyboardEvent) => {
    pressed_keys.current.delete(event.key);
  };

  // Add keydown and keyup event listeners
  useEffect(() => {
    document.addEventListener("keydown", handle_key_down);
    document.addEventListener("keyup", handle_key_up);

    return () => {
      document.removeEventListener("keydown", handle_key_down);
      document.removeEventListener("keyup", handle_key_up);
    };
  }, []);

  const characterRef =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const followerRef = useRef<THREE.Mesh>(null);

  const { camera_distance, camera_height } = useControls({
    camera_distance: 3.5,
    camera_height: 3.5,
  });

  // Use useFrame to update the camera position and lookAt
  useFrame(() => {
    const follower_ref = followerRef.current;
    const character_ref = characterRef.current;
    const camera_ref = cameraRef.current;

    if (!character_ref || !camera_ref || !follower_ref) {
      return;
    }

    const movement_speed = 0.1; // Adjust this value to control the character's movement speed
    const rotation_speed = 0.03; // Adjust this value to control the character's rotation speed

    const z_rotate = Math.cos(character_ref.rotation.y) * movement_speed;
    const x_rotate = Math.sin(character_ref.rotation.y) * movement_speed;

    // Move forward
    if (pressed_keys.current.has("w")) {
      character_ref.position.z += z_rotate;
      character_ref.position.x += x_rotate;

      follower_ref.position.z += z_rotate;
      follower_ref.position.x += x_rotate;
    }
    // Move backward
    if (pressed_keys.current.has("s")) {
      character_ref.position.z -= z_rotate;
      character_ref.position.x -= x_rotate;

      follower_ref.position.z -= z_rotate;
      follower_ref.position.x -= x_rotate;
    }
    // Move left
    if (pressed_keys.current.has("a")) {
      character_ref.position.z -= x_rotate;
      character_ref.position.x += z_rotate;

      follower_ref.position.z -= x_rotate;
      follower_ref.position.x += z_rotate;
    }
    // Move right
    if (pressed_keys.current.has("d")) {
      character_ref.position.z += x_rotate;
      character_ref.position.x -= z_rotate;

      follower_ref.position.z += x_rotate;
      follower_ref.position.x -= z_rotate;
    }

    // Turn character left
    if (pressed_keys.current.has("ArrowLeft")) {
      // nothing yet
      // character_ref.rotation.y += rotation_speed;
    }
    // Turn character right
    if (pressed_keys.current.has("ArrowRight")) {
      // nothing yet
    }

    // Update camera position and lookAt
    const camera_distance_offset = new THREE.Vector3(
      0,
      camera_height,
      -camera_distance
    );

    // TOGGLED: cameraPosition.applyQuaternion(character.quaternion); // or follower
    // NOTE:
    camera_distance_offset.add(follower_ref.position);
    camera_ref.position.copy(camera_distance_offset);

    // Calculate the center of the character mesh
    const character_center = new THREE.Vector3();
    character_ref.geometry.computeBoundingBox();
    character_ref.geometry.boundingBox &&
      character_ref.geometry.boundingBox.getCenter(character_center);
    character_center.applyMatrix4(character_ref.matrixWorld);

    // Set the camera's lookAt target to the center of the character mesh
    camera_ref.lookAt(character_center);
  });

  return (
    <>
      <group>
        {/* Camera doesn't follow group, it follows grouped-mesh from a distance */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault={true}
          fov={75}
          matrixWorldAutoUpdate={undefined}
          getObjectsByProperty={undefined}
        />
        <mesh ref={followerRef}>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshBasicMaterial color="green" wireframe={true} />
        </mesh>

        {/* Why, is the camera following the thing still */}
        {/* ^ Becauuse of `cameraPosition.add(character.position);` */}
        {/* arrow left and right handled, rotation by     `cameraPosition.applyQuaternion(character.quaternion);`
         */}

        {/* TODO-ing
 ### 1. Make the camera follow the character
  ### 2. Make the character move forward/backward/left/right
  ### 3. Make the character turn left/right


*/}
      </group>
      <group position={position} rotation={rotation}>
        <mesh ref={characterRef}>
          <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial attach="material" color="orange" />
          <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
        </mesh>
      </group>
    </>
  );
};
