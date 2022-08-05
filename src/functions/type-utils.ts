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
export const IMesh = {
  // Not really an Interface
  position: { type: ["undefined", "Vector3"], optional: true },
  up: { type: ["undefined", "Vector3"], optional: true },
  scale: { type: ["undefined", "Matrix4"], optional: true },

  rotation: { type: ["undefined", "Euler"], optional: true },
  matrix: { type: ["undefined", "Vector3"], optional: true },
  quaternion: { type: ["undefined", "Quaternion"], optional: true },
  layers: { type: ["undefined", "Layers"], optional: true },
};
// layers?: Layers;

interface PropArrayOption {
  index: number;
  key: string;
  type: string[];
  optional?: boolean;
}

/** if first letter is a capital */
export const ISupportingTypes: {
  Vector3: PropArrayOption[];
  Matrix4: {
    type: string[];
  };
  Euler: PropArrayOption[];
  Quaternion: PropArrayOption[];
} = {
  // Not really an Interface
  Vector3: [
    { index: 0, key: "x", type: ["undefined", "number"], optional: true },
    { index: 1, key: "y", type: ["undefined", "number"], optional: true },
    { index: 2, key: "z", type: ["undefined", "number"], optional: true },
  ],
  Matrix4: { type: ["number"] },
  Euler: [
    { index: 0, key: "x", type: ["undefined", "number"], optional: true },
    { index: 1, key: "y", type: ["undefined", "number"], optional: true },
    { index: 2, key: "z", type: ["undefined", "number"], optional: true },
    { index: 3, key: "order", type: ["string"], optional: true },
  ],
  Quaternion: [
    { index: 0, key: "x", type: ["undefined", "number"], optional: true },
    { index: 1, key: "y", type: ["undefined", "number"], optional: true },
    { index: 2, key: "z", type: ["undefined", "number"], optional: true },
    { index: 3, key: "w", type: ["undefined", "number"], optional: true },
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
