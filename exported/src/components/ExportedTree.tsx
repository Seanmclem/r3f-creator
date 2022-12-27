import React from "react";
import { Physics } from "@react-three/rapier";
import { GenericBox } from "./GenericBox";
import { PlaneGeneric } from "./PlaneGeneric";
import { DirectionalLight } from "./DirectionalLight";
import { TestCharacter } from "./TestCharacter";
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
        <PlaneGeneric
          color={"red"}
          position={[0, -10, 0]}
          dimensions={[225, 220]}
        ></PlaneGeneric>
        <DirectionalLight position={[10, 15, 10]}></DirectionalLight>
        <GenericBox
          color={"lightblue"}
          position={[0, 0, -11.083534086936549]}
          dimensions={[5, 5, 5]}
          rotation={[0, 0, 0]}
        ></GenericBox>
        <TestCharacter
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        ></TestCharacter>
      </>
    </Physics>
  );
};
