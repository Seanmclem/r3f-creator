import { useWindowSize } from "@react-hook/window-size";
import styled from "styled-components";

import { Canvas } from "@react-three/fiber";
import { Sidebar } from "../components/main-ui/Sidebar";

import { basicCanvas1 } from "../templates/canvas-templates";
import { TemplateToComponents } from "../translators/TemplateToComponents";
import { useTemplateStore } from "../stores/templateStore";
import { useEffect, lazy, Suspense, useRef } from "react";
import { TopBar } from "../components/top-bar/TopBar";
import { OrbitControls } from "@react-three/drei";
import { Object3D } from "three";

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
          <OrbitControls makeDefault />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} />
          <gridHelper args={[100, 25]} />
          {/* <>
            <mesh>
              <boxGeometry args={[5, 5, 5]} />
              <meshBasicMaterial color={"pink"} />
            </mesh>
          </> */}

          <Suspense fallback={null}>
            {/* <MyBox />
            <MyBox2 position={[-10, 5, 10]} /> */}
            <TemplateToComponents template={mainTemplate} />
          </Suspense>

          {/* <TheBox /> */}
          {/* <TemplateToComponents template={mainTemplate} /> */}
        </Canvas>
      </MainUiContainer>
    </>
  );
};

const MainUiContainer = styled.div`
  display: flex;
`;
