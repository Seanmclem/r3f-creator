import React from "react";
import { Physics } from "@react-three/rapier";
import { GenericBox } from "./GenericBox";
import { PlaneGeneric } from "./PlaneGeneric";
import { DirectionalLight } from "./DirectionalLight";
import { TestCharacter } from "./TestCharacter";
export const ExportedTree: React.FC<{}> = () => {
  return <Physics><>
      <GenericBox color={"lightblue"} position={[-10, 5, 10]} dimensions={[5, 5, 5]} rotation={[0, 0, 0]}></GenericBox>
      <PlaneGeneric color={"lightgreen"} position={[-0.0019530438556085725, 1.076336642193614, 0]} dimensions={[225, 220]} rotation={[0, 0.003081551703529195, 0]}></PlaneGeneric>
      <DirectionalLight position={[10, 15, 10]}></DirectionalLight>
      <GenericBox color={"lightgray"} position={[0, 8.05144423852079, -15.012733268975145]} dimensions={[8, 10, 10]} rotation={[0, 0.003081551703529195, 0.6163160855098393]}></GenericBox>
      <GenericBox color={"lightblue"} position={[0, 5.312762983621908, 11.294910772792871]} dimensions={[5, 5, 5]} rotation={[0.603564573669298, 0.053615326975520405, -0.8237754044939606]}></GenericBox>
      <TestCharacter position={[-0.0019530438556085725, 5.060687731561409, 0]} rotation={[0, 0, 0]}></TestCharacter>
    </>
  </Physics>;
};