import { PerspectiveCamera, useHelper } from "@react-three/drei";
import {
  BufferGeometry,
  Material,
  Mesh,
  PerspectiveCamera as PerspectiveCameraType,
} from "three";
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
      // rigidBody_Ref.current.lockRotations(true);
      // rigidBody_Ref.current.rotation().set(0, 0, 0, 0);

      //y static because no jumping yet, defaults to "just gravity", automatic
      rigidBody_Ref.current.setLinvel({ x, y: currentVel().y, z });
    }
  });

  const cameraRef = useRef<PerspectiveCameraType>(null);

  const [has_mounted, set_has_mounted] = useState(false);

  useEffect(() => {
    if (!has_mounted) {
      // cameraRef.current.lookAt(0, 1, 0);
      // console.log({ rot: cameraRef.current });
      set_has_mounted(true);

      setTimeout(() => {
        if (rigidBody_Ref.current) {
          console.log("trying");
          console.log("trying", rigidBody_Ref.current.rotation());
          // rigidBody_Ref.current.rotation().set(5, 25, 60, 100);
          console.log("trying", rigidBody_Ref.current.rotation());
        }
      }, 3000);
    }
  }, [has_mounted, set_has_mounted]);

  // middle value controls the pointed height, after left/right basically match..
  const third_person_camera_rotation = useRef([
    byDegree(-90),
    byDegree(-80),
    byDegree(-90),
  ]);

  const third_person_camera_position = useRef([-30, 6, 2]);

  //// FPS

  const fps_camera_position = useRef([
    position[0] + 0,
    position[1] + 3,
    position[2] + 0,
  ]);
  // since offsets are directly to the character-position, the offsets are no longer world-based

  const fps_camera_rotation = useRef([byDegree(0), byDegree(-90), byDegree(0)]);

  const mesh_ref = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

  useHelper(cameraRef, CameraHelper);

  return (
    <>
      <RigidBody
        ref={rigidBody_Ref}
        colliders={false}
        rotation={[0, byDegree(0), 0]}
        enabledRotations={[false, true, false]} // <-------- works, middle value is the desired horizontal rotation. update a stateful value for rotation, would a ref work? would be faster? Easily animatated?, yeah try useFrame animations
      >
        {/* <mesh position={[-10, 5, 2]} ref={ref1}>
          <boxGeometry />
          <meshStandardMaterial color={"hotpink"} />
        </mesh> */}
        <PerspectiveCamera
          ref={cameraRef}
          position={fps_camera_position.current as any}
          rotation={fps_camera_rotation.current as any}
          // rotation={[
          //   -1.190289949682533, -1.093182417070003, -1.1847906197962894,
          // ]}
          // local space / world space
          // makeDefault
        />

        <MeshCollider type="hull">
          <mesh
            ref={mesh_ref}
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
