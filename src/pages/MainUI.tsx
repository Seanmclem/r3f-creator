import { useWindowSize } from "@react-hook/window-size";
import styled from "styled-components";

import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
  // Vector3,
} from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls1";
import { Sidebar } from "../components/main-ui/Sidebar";

const Box = () => (
  <mesh>
    <boxGeometry args={[5, 5, 5]} />
    <meshBasicMaterial color={"blue"} />
  </mesh>
);

export const MainUI: React.VFC<{}> = () => {
  const [width, height] = useWindowSize();

  return (
    <MainUiContainer>
      <Sidebar />
      <Canvas
        style={{ height, width: width - 300 }}
        camera={{ fov: 75, position: [10, 8, 10] }}
      >
        <CameraControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} color={"red"} />
        <Box />
      </Canvas>
    </MainUiContainer>
  );
};

const MainUiContainer = styled.div`
  display: flex;
`;
