import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const useKeyListeners = () => {
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

  return pressedKeys as React.MutableRefObject<Set<string>>;
};

////

export const get_character_move_offset = (
  pressedKeys: React.MutableRefObject<Set<string>>
) => {
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

  return offset;
};

export const useMovement = ({
  pressedKeys,
  character_ref,
  camera_ref,
  horizontal_box_ref,
}: {
  pressedKeys: React.MutableRefObject<Set<string>>;
  character_ref: React.RefObject<THREE.Group>;
  camera_ref: React.RefObject<THREE.PerspectiveCamera>;

  horizontal_box_ref: React.RefObject<
    THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  >;
}) => {
  useFrame(() => {
    if (
      !character_ref.current ||
      !camera_ref.current ||
      !horizontal_box_ref.current
    ) {
      return;
    }

    // MOVING vvv WASD vv
    const character_offset = get_character_move_offset(pressedKeys);
    character_ref.current.position.add(character_offset);

    const character_target = new THREE.Vector3().setFromMatrixPosition(
      character_ref.current.matrixWorld
    );

    // camera_ref.current.position.copy(camera_position);
    camera_ref.current.lookAt(character_target);

    if (pressedKeys.current.has("ArrowDown")) {
      horizontal_box_ref.current.position.y += 0.02;

      // horizontal_box_ref.current.position.z += 0.02;
    }
    if (pressedKeys.current.has("ArrowUp")) {
      horizontal_box_ref.current.position.y -= 0.02;
      // horizontal_box_ref.current.position.z -= 0.02;
    }

    if (pressedKeys.current.has("ArrowLeft")) {
      horizontal_box_ref.current.rotateY(0.01);
    }
    if (pressedKeys.current.has("ArrowRight")) {
      horizontal_box_ref.current.rotateY(-0.01);
    }
  });
};
