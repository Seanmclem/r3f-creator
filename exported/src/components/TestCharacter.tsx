import { Vector3, Euler, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { bindKey } from "@rwh/keystrokes";
import { useEffect, useRef, useState } from "react";
import { BufferGeometry, Material, Mesh } from "three";

export const TestCharacter = ({
  position,
  rotation,
}: {
  position: number[];
  rotation: number[];
}) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );

  const [moving_up, set_moving_up] = useState(false);
  const [moving_left, set_moving_left] = useState(false);
  const [moving_down, set_moving_down] = useState(false);
  const [moving_right, set_moving_right] = useState(false);

  useEffect(() => {
    bindKey("w", {
      onPressed: () => {
        set_moving_up(true);
        console.log('You pressed "w"');
      },
      onPressedWithRepeat: () => console.log('You\'re pressing "w"'),
      onReleased: () => {
        set_moving_up(false);
        console.log('You released "w"');
      },
    });

    bindKey("a", {
      onPressed: () => {
        set_moving_left(true);
        console.log('You pressed "a"');
      },
      onPressedWithRepeat: () => console.log('You\'re pressing "a"'),
      onReleased: () => {
        set_moving_left(false);
        console.log('You released "a"');
      },
    });

    bindKey("s", {
      onPressed: () => {
        set_moving_down(true);
        console.log('You pressed "s"');
      },
      onPressedWithRepeat: () => console.log('You\'re pressing "s"'),
      onReleased: () => {
        set_moving_down(false);
        console.log('You released "s"');
      },
    });

    bindKey("d", {
      onPressed: () => {
        set_moving_right(true);
        console.log('You pressed "d"');
      },
      onPressedWithRepeat: () => console.log('You\'re pressing "d"'),
      onReleased: () => {
        set_moving_right(false);
        console.log('You released "d"');
      },
    });
  }, []);

  useFrame(() => {
    if (moving_up && meshRef.current) {
      meshRef.current.position.x = meshRef.current.position.x + 0.3;
    }
    if (moving_left && meshRef.current) {
      meshRef.current.position.z = meshRef.current.position.z - 0.3;
    }
    if (moving_down && meshRef.current) {
      meshRef.current.position.x = meshRef.current.position.x - 0.3;
    }
    if (moving_right && meshRef.current) {
      meshRef.current.position.z = meshRef.current.position.z + 0.3;
    }
  });

  return (
    <RigidBody>
      <mesh
        ref={meshRef}
        position={position as Vector3}
        rotation={rotation as Euler}
      >
        <capsuleGeometry attach="geometry" args={[2, 4, 4, 8]} />
        <meshBasicMaterial attach="material" color={"lightblue"} />
      </mesh>
    </RigidBody>
  );
};
