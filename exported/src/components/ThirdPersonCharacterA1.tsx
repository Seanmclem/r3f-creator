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
      offset.z -= 0.1;
    }
    if (pressedKeys.current.has("s")) {
      offset.z += 0.1;
    }
    if (pressedKeys.current.has("a")) {
      offset.x -= 0.1;
    }
    if (pressedKeys.current.has("d")) {
      offset.x += 0.1;
    }

    return offset;
  };
  // MOVEMENT END

  // CAMERA START
  const { camera } = useThree();
  const [distance, setDistance] = useState(5);
  const [angle, setAngle] = useState(0);

  useFrame(() => {
    if (!character_ref.current) {
      return;
    }

    const character_offset = get_character_move_offset();
    character_ref.current.position.add(character_offset);

    const character_target = new THREE.Vector3().setFromMatrixPosition(
      character_ref.current.matrixWorld
    );

    const camera_offset = new THREE.Vector3(0, 3.5, -distance).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    );
    const camera_position = character_target.clone().add(camera_offset);

    camera.position.copy(camera_position);
    camera.lookAt(character_target);
  });

  // CAMERA END

  const character_ref = useRef<THREE.Group>(null);

  return (
    <group
      ref={character_ref}
      position={position}
      rotation={rotation}
      scale={3}
    >
      {/* add first mesh here */}
      {/* add second mesh here */}
      {/* thanks chat pts, for a little help */}
      <mesh>
        <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial attach="material" color="orange" />
        <arrowHelper />
      </mesh>
    </group>
  );
};
