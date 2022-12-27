import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { Vector3, Euler, useFrame } from "@react-three/fiber";
import { MeshCollider, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { bindKey } from "@rwh/keystrokes";
import { useEffect, useRef, useState } from "react";
import { CameraHelper } from "three";

const byDegree = (degree: number) => (Math.PI / 180) * degree;

export const TestCharacter = ({
  position,
  rotation,
}: {
  position: number[];
  rotation: number[];
}) => {
  const rigidBody_Ref = useRef<RigidBodyApi>(null);

  const ref1 = useRef<any>(null);

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
    let x = 0;
    let z = 0;
    const speed = 10;

    if (moving_up && rigidBody_Ref.current) {
      // rigidBody_Ref.current.setAngvel
      x = x + speed;
    }
    if (moving_left && rigidBody_Ref.current) {
      z = z - speed;
    }
    if (moving_down && rigidBody_Ref.current) {
      x = x - speed;
    }
    if (moving_right && rigidBody_Ref.current) {
      z = z + speed;
    }

    // console.log({ pos: ref1.current?.position });

    if (rigidBody_Ref?.current) {
      const currentVel = rigidBody_Ref.current.linvel;
      rigidBody_Ref.current.lockRotations(true);

      rigidBody_Ref.current.setLinvel({ x, y: currentVel().y, z });
    }
  });
  const cameraRef = useRef<any>(null);

  const [has_mounted, set_has_mounted] = useState(false);

  useEffect(() => {
    if (!has_mounted && cameraRef.current) {
      // cameraRef.current.lookAt(0, 1, 0);
      // console.log({ rot: cameraRef.current });
      set_has_mounted(true);
      // cameraRef.current?.rotateY(-14);
    }
  }, [has_mounted, set_has_mounted]);

  useHelper(cameraRef, CameraHelper);
  // poo.current
  return (
    <>
      <RigidBody ref={rigidBody_Ref} colliders={false}>
        {/* <mesh position={[-10, 5, 2]} ref={ref1}>
          <boxGeometry />
          <meshStandardMaterial color={"hotpink"} />
        </mesh> */}
        <PerspectiveCamera
          ref={cameraRef}
          position={[-30, 6, 2]}
          rotation={[byDegree(0), byDegree(-91), byDegree(0)]}
          // rotation={[
          //   -1.190289949682533, -1.093182417070003, -1.1847906197962894,
          // ]}
          // local space / world space
          // makeDefault
        />

        <MeshCollider type="hull">
          <mesh
            position={position as Vector3}
            rotation={rotation as Euler}
            castShadow
          >
            <capsuleGeometry attach="geometry" args={[2, 4, 4, 8]} />
            <meshPhongMaterial attach="material" color={"lightblue"} />
          </mesh>
        </MeshCollider>
      </RigidBody>
    </>
  );
};
