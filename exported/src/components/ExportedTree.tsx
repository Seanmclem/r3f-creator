import React from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { GenericBox } from "./GenericBox";
export const ExportedTree: React.FC<{}> = () => {
  return (
    <Physics>
      <>
        <GenericBox
          color={"lightblue"}
          position={[-10, 5, 10]}
          dimensions={[5, 5, 5]}
          rotation={[0, 0, 0]}
        ></GenericBox>
        <GenericBox
          color={"lightblue"}
          position={[0, 0, 0]}
          dimensions={[5, 5, 5]}
          rotation={[0, 0, 0]}
        ></GenericBox>

        {/* <ambientLight /> */}

        <RigidBody>
          <mesh
            position={[0, -10, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            // scale={[1, 1, 1]}
          >
            <planeBufferGeometry attach="geometry" args={[25, 20]} />
            <meshPhongMaterial attach="material" color="green" />
          </mesh>
        </RigidBody>
      </>
    </Physics>
  );
};
