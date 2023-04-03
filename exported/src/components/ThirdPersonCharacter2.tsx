import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ThirdPersonCharacter = ({ position, rotation }: any) => {
  const groupRef = useRef<any>();
  const [keysPressed, setKeysPressed] = useState<any[]>([]);
  const speed = 0.1; // adjust movement speed as needed
  const cameraDistance = 5; // adjust camera distance as needed

  const handleKeyDown = (e) => {
    if (!keysPressed.includes(e.code)) {
      setKeysPressed([...keysPressed, e.code]);
    }
  };

  const handleKeyUp = (e) => {
    setKeysPressed(keysPressed.filter((code) => code !== e.code));
  };

  const handleCameraRotation = () => {
    const group = groupRef.current;

    if (keysPressed.includes("ArrowLeft")) {
      group.rotateY(THREE.MathUtils.degToRad(-1));
    }
    if (keysPressed.includes("ArrowRight")) {
      group.rotateY(THREE.MathUtils.degToRad(1));
    }
  };

  const handleMovement = () => {
    const group = groupRef.current;
    const direction = new THREE.Vector3();
    const cameraDirection = new THREE.Vector3();
    const forwardVector = new THREE.Vector3(0, 0, -1);

    if (group) {
      const quaternion = group.quaternion;
      direction.z =
        -Number(keysPressed.includes("ArrowUp")) +
        Number(keysPressed.includes("ArrowDown"));
      direction.x =
        -Number(keysPressed.includes("ArrowLeft")) +
        Number(keysPressed.includes("ArrowRight"));

      cameraDirection.copy(forwardVector).applyQuaternion(quaternion);

      group.position.add(
        direction.multiplyScalar(speed).applyQuaternion(quaternion)
      );
      group.lookAt(group.position.clone().add(cameraDirection));

      // update camera position
      const cameraPosition = group.position
        .clone()
        .add(cameraDirection.multiplyScalar(cameraDistance));
      group.children[1].position.set(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z
      );
    }
  };

  useFrame(() => {
    handleCameraRotation();
    handleMovement();
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <group position={position} rotation={rotation} scale={3}>
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
