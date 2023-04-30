import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

const degrees_to_radians = (degrees: number) => degrees * (Math.PI / 180);

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

  const followerBoxRef =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const characterMeshRef = useRef<THREE.Mesh>(null);
  const followerGroupRef = useRef<THREE.Group>(null);

  const { camera_distance, camera_height } = useControls({
    camera_distance: 3.5,
    camera_height: 3.5,
    rotation: 0, // do it
  });

  const [follower_height] = useState(1);

  // Use useFrame to update the camera position and lookAt
  useFrame(() => {
    const character_mesh_ref = characterMeshRef.current;
    const follower_box_ref = followerBoxRef.current;
    const camera_ref = cameraRef.current;
    const follower_group_ref = followerGroupRef.current;

    if (
      !follower_box_ref ||
      !camera_ref ||
      !character_mesh_ref ||
      !follower_group_ref
    ) {
      return;
    }

    let rotation_degrees = 0;

    const movement_speed = 0.1; // Adjust this value to control the character's movement speed
    const rotation_speed = 0.03; // Adjust this value to control the character's rotation speed

    const z_rotate = Math.cos(follower_box_ref.rotation.y) * movement_speed;
    const x_rotate = Math.sin(follower_box_ref.rotation.y) * movement_speed;

    // const before_point = new THREE.Vector3(
    //   followerBoxRef.current.position.x,
    //   followerBoxRef.current.position.y,
    //   followerBoxRef.current.position.z
    // );

    // Move forward
    if (pressed_keys.current.has("w")) {
      follower_box_ref.position.z += z_rotate;
      follower_box_ref.position.x += x_rotate;

      character_mesh_ref.position.z += z_rotate;
      character_mesh_ref.position.x += x_rotate;

      rotation_degrees += 0;
    }
    // Move backward
    if (pressed_keys.current.has("s")) {
      follower_box_ref.position.z -= z_rotate;
      follower_box_ref.position.x -= x_rotate;

      character_mesh_ref.position.z -= z_rotate;
      character_mesh_ref.position.x -= x_rotate;

      rotation_degrees += 180;
    }
    // Move left
    if (pressed_keys.current.has("a")) {
      follower_box_ref.position.z -= x_rotate;
      follower_box_ref.position.x += z_rotate;

      character_mesh_ref.position.z -= x_rotate;
      character_mesh_ref.position.x += z_rotate;

      rotation_degrees += 90;
    }
    // Move right
    if (pressed_keys.current.has("d")) {
      follower_box_ref.position.z += x_rotate;
      follower_box_ref.position.x -= z_rotate;

      character_mesh_ref.position.z += x_rotate;
      character_mesh_ref.position.x -= z_rotate;

      rotation_degrees += 270;
    }

    // get the follower height to match the character
    follower_box_ref.position.y =
      character_mesh_ref.position.y + follower_height;

    // const after_point = new THREE.Vector3(
    //   followerBoxRef.current.position.x,
    //   followerBoxRef.current.position.y,
    //   followerBoxRef.current.position.z
    // );

    // Turn character left
    if (pressed_keys.current.has("ArrowLeft")) {
      // nothing yet
      // character_ref.rotation.y += rotation_speed;
      follower_group_ref.rotation.y += rotation_speed;
      ////
      // Changing this ^ does change the relative forward/all directions of movement
      // could rotate the character/camaera/follower together, to change relevant forward direction of movement
      //
      // character_ref is now basically the follower box. Names have swapped and I can't figure out how to make it make sense
    }
    // Turn character right
    if (pressed_keys.current.has("ArrowRight")) {
      // nothing yet
      follower_group_ref.rotation.y -= rotation_speed;
    }

    // Update camera position and lookAt
    const camera_distance_offset = new THREE.Vector3(
      0,
      camera_height,
      -camera_distance
    );

    // TOGGLED: cameraPosition.applyQuaternion(character.quaternion); // or follower

    // NOTE: Take camera-distance-offset, add the follower's position, and set the camera's position to that
    camera_distance_offset.add(character_mesh_ref.position);
    camera_ref.position.copy(camera_distance_offset);

    // Calculate the center of the character mesh
    // initialize a new vector3 for the center
    const character_center = new THREE.Vector3();

    // compute the bounding box of the character mesh
    follower_box_ref.geometry.computeBoundingBox();

    // get the center of the bounding box, in the world, and set the character_center to that
    // So you can tell the camera to look at the center of the character mesh.
    // Center is important so the camera doesn't look too far in the wrong direction, like the edge of the box
    follower_box_ref.geometry.boundingBox &&
      follower_box_ref.geometry.boundingBox.getCenter(character_center);
    character_center.applyMatrix4(follower_box_ref.matrixWorld);

    // Set the camera's lookAt target to the center of the character mesh
    camera_ref.lookAt(character_center);

    // console.log("degrees_to_radians", degrees_to_radians(45));

    const newRotation = new THREE.Euler(
      0, // x-axis rotation
      degrees_to_radians(0), // 180 + 90 = 270
      0, // z-axis rotation
      "YXZ" // rotation order
    );

    character_mesh_ref.setRotationFromEuler(newRotation);
    // breaks character rotation
  });

  const bboxRef = useRef<any>(null);

  useEffect(() => {
    if (!followerGroupRef.current) return;
    const bbox = new THREE.Box3().setFromObject(followerGroupRef.current);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    followerGroupRef.current.position.set(-center.x, -center.y, -center.z);
  }, []);

  return (
    <>
      <group ref={followerGroupRef} position={position} rotation={rotation}>
        {/* Camera doesn't follow group, it follows grouped-mesh from a distance */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault={true}
          fov={75}
          matrixWorldAutoUpdate={undefined}
          getObjectsByProperty={undefined}
        />
        <mesh ref={followerBoxRef}>
          <boxGeometry
            attach="geometry"
            args={[follower_height, follower_height, follower_height]}
          />
          <meshBasicMaterial color="green" wireframe={true} />
        </mesh>
      </group>

      <group position={position} rotation={rotation}>
        <mesh ref={characterMeshRef}>
          <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial attach="material" color="orange" />
          <arrowHelper args={[new THREE.Vector3(0, 0, 1)]} />
        </mesh>
      </group>
    </>
  );
};
