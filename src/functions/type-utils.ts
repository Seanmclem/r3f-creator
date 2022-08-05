// export const getTypes = async () => {
//   try {
//     console.log("about to try");
//     const result = await fetch("/three-types.d.ts");
//     const stringRes = await result.text();
//     console.log(stringRes, stringRes);
//   } catch (ex) {
//     console.error(ex);
//   }
// };

import { Mesh } from "three";

export const IBoxGeometry = {
  // Not really an Interface
  args: [
    //constructor
    { index: 0, key: "width", type: ["undefined", "number"], optional: true },
    { index: 1, key: "height", type: ["undefined", "number"], optional: true },
    { index: 2, key: "depth", type: ["undefined", "number"], optional: true },
    {
      index: 3,
      key: "widthSegments",
      type: ["undefined", "number"],
      optional: true,
    },
    {
      index: 4,
      key: "heightSegments",
      type: ["undefined", "number"],
      optional: true,
    },
    {
      index: 5,
      key: "depthSegments",
      type: ["undefined", "number"],
      optional: true,
    },
  ],
};

/** Not really an Interface */
export const IMeshBasicMaterial = {
  color: { type: ["string", "number"], optional: true }, // ColorRepresentation = Color | string | number
  opacity: { type: ["undefined", "number"], optional: true },
  map: { type: ["undefined", "null"], optional: true }, // | Texture

  lightMap: { type: ["null"], optional: true }, // | Texture
  lightMapIntensity: { type: ["undefined", "number"], optional: true },
  aoMap: { type: ["undefined", "null"], optional: true }, // | Texture

  aoMapIntensity: { type: ["undefined", "number"], optional: true },
  specularMap: { type: ["undefined", "null"], optional: true }, // | Texture
  alphaMap: { type: ["undefined", "null"], optional: true }, // | Texture

  envMap: { type: ["undefined", "null"], optional: true }, // | Texture
  combine: { type: ["undefined"], optional: true }, // Combine?
  reflectivity: { type: ["undefined", "number"], optional: true },

  refractionRatio: { type: ["undefined", "number"], optional: true },
  wireframe: { type: ["undefined", "boolean"], optional: true },

  wireframeLinewidth: { type: ["undefined", "number"], optional: true },
  wireframeLinecap: { type: ["undefined", "string"], optional: true },
  wireframeLinejoin: { type: ["undefined", "string"], optional: true },
};

// Mesh
// position?: Vector3;
// up?: Vector3;
// scale?: Vector3;
// rotation?: Euler;
// matrix?: Matrix4;
// quaternion?: Quaternion;
// layers?: Layers;

export const whatAreTheseTYPES = (tagName: string) => {
  console.log("test");
  const options: Record<string, any> = {
    boxGeometry: IBoxGeometry,
    meshBasicMaterial: IMeshBasicMaterial,
  };

  const result = options[tagName];
  console.log(result);

  return result;
};
