import React from "react";
import { Physics } from "@react-three/rapier";
import { GenericBox } from "./GenericBox";
export const ExportedTree: React.FC<{}> = () => {
  return <Physics><>
      <GenericBox color={"lightblue"} position={[-10, 5, 10]} dimensions={[5, 5, 5]} rotation={[0, 0, 0]}></GenericBox>
      <GenericBox color={"lightblue"} position={[0, 0, 0]} dimensions={[5, 5, 5]} rotation={[0, 0, 0]}></GenericBox>
    </>
  </Physics>;
};