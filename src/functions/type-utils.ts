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

export const IBoxGeometry: { args: PropArrayOption[] } = {
  // Not really an Interface
  args: [
    //constructor
    { index: 0, key: "width", type: "number", optional: true },
    { index: 1, key: "height", type: "number", optional: true },
    { index: 2, key: "depth", type: "number", optional: true },
    {
      index: 3,
      key: "widthSegments",
      type: "number",
      optional: true,
    },
    {
      index: 4,
      key: "heightSegments",
      type: "number",
      optional: true,
    },
    {
      index: 5,
      key: "depthSegments",
      type: "number",
      optional: true,
    },
  ],
};

export type PrimitiveType =
  | "undefined"
  | "null"
  | "string"
  | "number"
  | "boolean"
  | "args-array"
  | "props-array";

export interface PropOption {
  type: PrimitiveType;
  optional?: boolean;
}

/** Not really an Interface */
export const IMeshBasicMaterial: Record<string, PropOption> = {
  color: { type: "string", optional: true }, // ColorRepresentation = Color | string | number
  opacity: { type: "number", optional: true },
  // map: { type: "null", optional: true }, // | Texture

  // lightMap: { type: "null", optional: true }, // | Texture
  lightMapIntensity: { type: "number", optional: true },
  // aoMap: { type: "null", optional: true }, // | Texture

  aoMapIntensity: { type: "number", optional: true },
  // specularMap: { type: "null", optional: true }, // | Texture
  // alphaMap: { type: "null", optional: true }, // | Texture

  // envMap: { type: "null", optional: true }, // | Texture
  // combine: { type: "undefined", optional: true }, // Combine?
  reflectivity: { type: "number", optional: true },

  refractionRatio: { type: "number", optional: true },
  wireframe: { type: "boolean", optional: true },

  wireframeLinewidth: { type: "number", optional: true },
  wireframeLinecap: { type: "string", optional: true },
  wireframeLinejoin: { type: "string", optional: true },
};

// Mesh
export const IMesh = {
  // Not really an Interface
  position: { type: "Vector3", optional: true },
  up: { type: "Vector3", optional: true },
  scale: { type: "Matrix4", optional: true },

  rotation: { type: "Euler", optional: true },
  matrix: { type: "Vector3", optional: true },
  quaternion: { type: "Quaternion", optional: true },
  layers: { type: "Layers", optional: true },
};
// layers?: Layers;

export interface PropArrayOption {
  index: number;
  key: string;
  type: string;
  optional?: boolean;
}

/** if first letter is a capital */
export const ISupportingTypes: Record<string, PropArrayOption[]> = {
  // Not really an Interface
  Vector3: [
    { index: 0, key: "x", type: "number", optional: true },
    { index: 1, key: "y", type: "number", optional: true },
    { index: 2, key: "z", type: "number", optional: true },
  ],
  // Matrix4: { type: "number" },
  Euler: [
    { index: 0, key: "x", type: "number", optional: true },
    { index: 1, key: "y", type: "number", optional: true },
    { index: 2, key: "z", type: "number", optional: true },
    { index: 3, key: "order", type: "string", optional: true },
  ],
  Quaternion: [
    { index: 0, key: "x", type: "number", optional: true },
    { index: 1, key: "y", type: "number", optional: true },
    { index: 2, key: "z", type: "number", optional: true },
    { index: 3, key: "w", type: "number", optional: true },
  ],
};

export const whatAreTheseTYPES = (tagName: string) => {
  console.log("test");
  const options: Record<string, any> = {
    mesh: IMesh,
    boxGeometry: IBoxGeometry,
    meshBasicMaterial: IMeshBasicMaterial,
  };

  const result = options[tagName];
  console.log(result);

  return result;
};

/** Starts with capital */
export const isSupportingType = (type: string) =>
  type[0].toUpperCase() === type[0];
