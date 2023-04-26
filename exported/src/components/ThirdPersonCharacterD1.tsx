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

  const [follower_height] = useState(1);

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

    const before_point = new THREE.Vector3(
      characterRef.current.position.x,
      characterRef.current.position.y,
      characterRef.current.position.z
    );

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

    // get the follower height to match the character
    character_ref.position.y = follower_ref.position.y + follower_height;

    const after_point = new THREE.Vector3(
      characterRef.current.position.x,
      characterRef.current.position.y,
      characterRef.current.position.z
    );

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

    // NOTE: Take camera-distance-offset, add the follower's position, and set the camera's position to that
    camera_distance_offset.add(follower_ref.position);
    camera_ref.position.copy(camera_distance_offset);

    // Calculate the center of the character mesh
    // initialize a new vector3 for the center
    const character_center = new THREE.Vector3();

    // compute the bounding box of the character mesh
    character_ref.geometry.computeBoundingBox();

    // get the center of the bounding box, in the world, and set the character_center to that
    // So you can tell the camera to look at the center of the character mesh.
    // Center is important so the camera doesn't look too far in the wrong direction, like the edge of the box
    character_ref.geometry.boundingBox &&
      character_ref.geometry.boundingBox.getCenter(character_center);
    character_center.applyMatrix4(character_ref.matrixWorld);

    // Set the camera's lookAt target to the center of the character mesh
    camera_ref.lookAt(character_center);

    const newRotation = new THREE.Euler(
      0, // x-axis rotation
      1.5, // y-axis rotation
      //q what type of unit or value range is this? 0-360? 0-1?
      //a 0-1
      //q so 0.5 is 180 degrees?
      //a yes
      //q it's not
      //a it is
      0, // z-axis rotation
      "YXZ" // rotation order
    );

    follower_ref.setRotationFromEuler(newRotation);
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
        <mesh ref={characterRef}>
          <boxGeometry
            attach="geometry"
            args={[follower_height, follower_height, follower_height]}
          />
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
        <mesh ref={followerRef}>
          <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial attach="material" color="orange" />
          <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
        </mesh>
      </group>
    </>
  );
};
