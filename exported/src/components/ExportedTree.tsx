import React from "react";
import { Physics } from "@react-three/rapier";
import { GenericBox } from "./GenericBox";
import { PlaneGeneric } from "./PlaneGeneric";
import { DirectionalLight } from "./DirectionalLight";
import { TestCharacter } from "./TestCharacter";
export const ExportedTree: React.FC<{}> = () => {
  return <Physics><>
      <GenericBox color={"lightblue"} position={[-10, 5, 10]} dimensions={[5, 5, 5]} rotation={[0, 0, 0]}></GenericBox>
      <PlaneGeneric color={"lightgreen"} position={[-3.5278149881259466, -0.06058730020770753, 0]} dimensions={[225, 220]} rotation={[0, 0.003081551703529195, 0]}></PlaneGeneric>
      <DirectionalLight position={[10, 15, 10]}></DirectionalLight>
      <GenericBox color={"lightgray"} position={[0, 6.557652065923836, -15.012733268975145]} dimensions={[8, 10, 10]} rotation={[0, 0.003081551703529195, 0.6163160855098393]}></GenericBox>
      <GenericBox color={"lightblue"} position={[0, 4.844130408420643, 11.294910772792871]} dimensions={[5, 5, 5]} rotation={[0.603564573669298, 0.053615326975520405, -0.9159020251129283]}></GenericBox>
      <TestCharacter position={[0, 4.080371366244004, 0]} rotation={[0, 0, 0]}></TestCharacter>
      <GenericBox color={"lightblue"} position={[8.437569218870726, 3.186589455415344, 11.010087290176667]} dimensions={[5, 5, 5]} rotation={[0, 0, 0]}></GenericBox>
      <GenericBox color={"lightblue"} position={[20.835747171253466, 3.70962031939355, 11.364266225352909]} dimensions={[5, 5, 5]} rotation={[0, 0, 0]}></GenericBox>
    </>
  </Physics>;
};