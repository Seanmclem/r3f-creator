import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

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

  const get_character_move_offset = () => {
    // Calculate character offset based on pressed keys
    let offset = new THREE.Vector3(0, 0, 0);
    if (pressedKeys.current.has("w")) {
      offset.z += 0.1;
    }
    if (pressedKeys.current.has("s")) {
      offset.z -= 0.1;
    }
    if (pressedKeys.current.has("a")) {
      offset.x += 0.1;
    }
    if (pressedKeys.current.has("d")) {
      offset.x -= 0.1;
    }

    // if (pressedKeys.current.has("ArrowRight")) {
    //   angleRef.current -= 0.02;
    // }

    // if (pressedKeys.current.has("ArrowUp")) {
    //   setDistance(Math.max(distance - 0.1, 2));
    // }
    // if (pressedKeys.current.has("ArrowDown")) {
    //   setDistance(Math.min(distance + 0.1, 10));
    // }

    return offset;
  };
  // MOVEMENT END

  // CAMERA START
  //   const { camera } = useThree();
  const [distance, setDistance] = useState(2.5);

  //   const xAxis = new THREE.Vector3(1, 0, 0);

  //   // Set the initial rotation angle in radians
  const x_Vert_angle_ref = useRef(0);
  const cumulativeRotation = new THREE.Euler();

  useFrame(() => {
    if (
      !character_ref.current ||
      !horizontal_box_ref.current ||
      !camera_ref.current
    ) {
      return;
    }

    const character_offset = get_character_move_offset();
    character_ref.current.position.add(character_offset);

    const character_target = new THREE.Vector3().setFromMatrixPosition(
      character_ref.current.matrixWorld
    );

    // camera_ref.current.position.copy(camera_position);
    camera_ref.current.lookAt(character_target);

    if (pressedKeys.current.has("ArrowLeft")) {
      horizontal_box_ref.current.rotateY(-0.01);
    }
    if (pressedKeys.current.has("ArrowRight")) {
      horizontal_box_ref.current.rotateY(0.01);
    }

    if (pressedKeys.current.has("ArrowUp")) {
      // Get the current X-axis of the box
    }

    if (pressedKeys.current.has("ArrowDown")) {
      // Get the current X-axis of the box
    }
    // if (pressedKeys.current.has("ArrowDown")) {
    //   setDistance(Math.min(distance + 0.1, 10));
    // }
  });

  //   useFrame(() => {
  //     if (
  //       !character_ref.current ||
  //       !vertical_box_ref.current ||
  //       !camera_ref.current
  //     ) {
  //       return;
  //     }

  //     const character_offset = get_character_move_offset();
  //     character_ref.current.position.add(character_offset);

  //     const character_target = new THREE.Vector3().setFromMatrixPosition(
  //       character_ref.current.matrixWorld
  //     );

  //     // camera_ref.current.position.copy(camera_position);
  //     camera_ref.current.lookAt(character_target);

  //     vertical_box_ref.current.rotateX(0.005);
  //   });

  //   // Set the rotation speed in radians per second
  const rotationSpeed = 0.5;

  //   X-VERTICAL ROTATION
  //   Use the useFrame hook to update the scene on each frame
  useFrame((_state, delta) => {
    //   return false;
    if (!camera_ref.current || !character_ref.current) {
      return;
    }
    // Calculate the incremental rotation for this frame
    const increment = rotationSpeed * delta;

    // Add the incremental rotation to the current angle
    const newAngle = x_Vert_angle_ref.current + increment;

    if (pressedKeys.current.has("ArrowUp")) {
      // Get the current X-axis of the box

      // Calculate the rotation quaternion for this frame
      const xAxis = new THREE.Vector3(1, 0, 0);
      const quat = new THREE.Quaternion().setFromAxisAngle(xAxis, -0.007);

      // Apply the rotation to the object
      character_ref.current.applyQuaternion(quat);

      // Update the current angle state
      x_Vert_angle_ref.current = newAngle;
    }

    if (pressedKeys.current.has("ArrowDown")) {
      // Get the current X-axis of the box
      // Calculate the rotation quaternion for this frame
      const xAxis = new THREE.Vector3(1, 0, 0);
      const quat = new THREE.Quaternion().setFromAxisAngle(xAxis, 0.007);

      // Apply the rotation to the object
      character_ref.current.applyQuaternion(quat);

      // Update the current angle state
      x_Vert_angle_ref.current = newAngle;
    }

    const character_target = new THREE.Vector3().setFromMatrixPosition(
      character_ref.current.matrixWorld
    );

    // camera_ref.current.position.copy(camera_position);
    camera_ref.current.lookAt(character_target);
  });

  // CAMERA END

  const character_ref = useRef<THREE.Group>(null);

  const camera_ref = useRef<THREE.PerspectiveCamera>(null);
  const horizontal_box_ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );

  const vertical_box_ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );

  return (
    <group
      ref={character_ref}
      position={position}
      rotation={rotation}
      scale={3}
    >
      {/* add first mesh here */}
      {/* add second mesh here */}
      {/* thanks chat gpt, for a little help */}
      {/*  */}
      <mesh ref={vertical_box_ref}>
        <boxGeometry attach="geometry" args={[1.3, 1.3, 1.3]} />
        <meshBasicMaterial attach="material" color="blue" wireframe={true} />
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
