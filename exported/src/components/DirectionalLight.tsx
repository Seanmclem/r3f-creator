import { Vector3 } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const DirectionalLight = ({ position }: { position: number[] }) => {
  const reffy = useRef<any>(null);
  useEffect(() => {
    if (reffy.current) {
      reffy.current.shadow.camera.left = -1000;
      reffy.current.shadow.camera.right = 1000;
      reffy.current.shadow.camera.top = 1000;
      reffy.current.shadow.camera.bottom = -1000;
    }
  }, []);

  // or just use point light
  return (
    <directionalLight
      ref={reffy}
      position={position as Vector3}
      intensity={1}
      castShadow
      shadow-mapSize-height={2512}
      shadow-mapSize-width={2512}
    />
  );
};

export default DirectionalLight;
