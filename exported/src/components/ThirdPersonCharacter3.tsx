import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  const meshRef = useRef<any>();
  const speed = 0.1; // adjust movement speed as needed

  const [keysPressed, setKeysPressed] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyQ: false,
    KeyE: false,
  });

  const handleKeyDown = (event: any) => {
    if (event.code in keysPressed) {
      setKeysPressed((prevState) => ({ ...prevState, [event.code]: true }));
    }
  };

  const handleKeyUp = (event: any) => {
    if (event.code in keysPressed) {
      setKeysPressed((prevState) => ({ ...prevState, [event.code]: false }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    // Get camera direction and rotate character towards it
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const angle = Math.atan2(-cameraDirection.x, -cameraDirection.z);
    // meshRef.current.rotation.y = angle;

    // Move character forward in its own local space
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(meshRef.current.quaternion);

    if (keysPressed.ArrowUp) {
      console.log("moving forward");
      meshRef.current.position.add(forward.multiplyScalar(speed));
    }
    if (keysPressed.ArrowDown) {
      meshRef.current.position.sub(forward.multiplyScalar(speed));
    }
    if (keysPressed.ArrowLeft) {
      meshRef.current.rotation.y += 0.05;
    }
    if (keysPressed.ArrowRight) {
      meshRef.current.rotation.y -= 0.05;
    }
    if (keysPressed.KeyQ) {
      camera.position.y += 0.1;
      camera.lookAt(meshRef.current.position);
    }
    if (keysPressed.KeyE) {
      camera.position.y -= 0.1;
      camera.lookAt(meshRef.current.position);
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={3}>
      {/* add character geometry here */}
      {/* thanks chat pts, for a little help */}
      <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial attach="material" color="orange" />
      <arrowHelper />
      <PerspectiveCamera position={[1, 0, 10]} makeDefault />
    </mesh>
  );
};
