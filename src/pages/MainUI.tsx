import { useWindowSize } from "@react-hook/window-size";
import styled from "styled-components";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls1";
import { Sidebar } from "../components/main-ui/Sidebar";

import { basicCanvas1 } from "../templates/canvas-templates";
import { TemplateToComponents } from "../translators/TemplateToComponents";
import { useTemplateStore } from "../stores/templateStore";
import { useEffect } from "react";
import { TopBar } from "../components/top-bar/TopBar";

// const Box = () => (
//   <mesh>
//     <boxGeometry args={[5, 5, 5]} />
//     <meshBasicMaterial color={"blue"} />
//   </mesh>
// );

export const MainUI: React.VFC<{}> = () => {
  const [width, height] = useWindowSize();

  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );
  useEffect(() => {
    updateMainTemplate(basicCanvas1); // added on first load
  }, []);

  return (
    <>
      <TopBar />
      <MainUiContainer>
        <Sidebar mainTemplate={mainTemplate} />
        <Canvas
          style={{ height, width: width - 300 }}
          camera={{ fov: 75, position: [10, 8, 10] }}
        >
          <CameraControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} color={"red"} />
          <gridHelper args={[100, 25]} />

          {/* <>
            <mesh>
              <boxGeometry args={[5, 5, 5]} />
              <meshBasicMaterial color={"pink"} />
            </mesh>
          </> */}

          <TemplateToComponents template={mainTemplate} />
        </Canvas>
      </MainUiContainer>
    </>
  );
};

const MainUiContainer = styled.div`
  display: flex;
`;
