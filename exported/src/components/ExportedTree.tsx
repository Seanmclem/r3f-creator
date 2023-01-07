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
      <GenericBox color={"lightgray"} position={[21.996369886154035, 6.147409477732454, -1.5523926641056018]} dimensions={[33, 1, 8]} rotation={[0, 0, 0.4138316429177604]} fixed={true}></GenericBox>
      <GenericBox color={"lightblue"} position={[0, 4.844130408420643, 11.294910772792871]} dimensions={[5, 5, 5]} rotation={[0.603564573669298, 0.053615326975520405, -0.9159020251129283]}></GenericBox>
      <TestCharacter position={[0, 4.080371366244004, 0]} rotation={[0, 0, 0]}></TestCharacter>
      <GenericBox color={"lightblue"} position={[47.03253007819237, 12.792730417658156, -1.4478578411522385]} dimensions={[20, 1, 8]} rotation={[0, -0.006605970312912657, 0.007618289762711061]} fixed={true}></GenericBox>
      <GenericBox color={"lightblue"} position={[20.835747171253466, 14.500613903345116, -18.361846767055503]} dimensions={[5, 5, 5]} rotation={[0.2245285263674862, -0.13556564297611615, 0]}></GenericBox>
    </>
  </Physics>;
};