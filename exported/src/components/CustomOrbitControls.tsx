import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const CustomOrbitControls = ({ camera }: { camera: any }) => {
  const { gl } = useThree();
  const orbitControlsRef = useRef<OrbitControls>();

  // Create OrbitControls and attach to camera
  useEffect(() => {
    orbitControlsRef.current = new OrbitControls(camera, gl.domElement);
    orbitControlsRef.current.enableKeys = true; // Enable keyboard controls
    orbitControlsRef.current.update();
  }, [camera, gl.domElement]);

  // Update OrbitControls based on arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!orbitControlsRef.current) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          orbitControlsRef.current.target.y += 1; // Update target y position
          break;
        case "ArrowDown":
          orbitControlsRef.current.target.y -= 1; // Update target y position
          break;
        case "ArrowLeft":
          orbitControlsRef.current.target.x -= 1; // Update target x position
          break;
        case "ArrowRight":
          orbitControlsRef.current.target.x += 1; // Update target x position
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};
