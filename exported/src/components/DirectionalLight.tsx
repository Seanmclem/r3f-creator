import { Vector3 } from "@react-three/fiber";

export const DirectionalLight = ({ position }: { position: number[] }) => {
  return <directionalLight position={position as Vector3} intensity={1} />;
};

export default DirectionalLight;
