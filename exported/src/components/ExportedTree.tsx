import React from "react";
import { GenericBox } from "./GenericBox";

export const ExportedTree: React.FC<{}> = () => {
  return (
    <>
      <>
        <GenericBox
          color={'"lightblue"'}
          position={[3.735403727583906, 5, 3.0726621934324143]}
          dimensions={[5, 5, 5]}
          rotation={[0, 0, 0]}
        ></GenericBox>
        <GenericBox
          color={'"lightblue"'}
          position={[10.385810026227547, 4.646159415650183, 0]}
          dimensions={[5, 5, 5]}
          rotation={[0, 0, 0]}
        ></GenericBox>
        <GenericBox
          color={'"lightblue"'}
          position={[7.365470746838363, 3.53633376465532, 9.205496976055798]}
          dimensions={[5, 5, 5]}
          rotation={[0, 0, 0]}
        ></GenericBox>
      </>
    </>
  );
};
