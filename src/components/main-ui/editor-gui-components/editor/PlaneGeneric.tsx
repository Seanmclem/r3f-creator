import { RigidBody } from "@react-three/rapier";
import { FieldDefinition, RuntimeInterface } from "../../SelectedNodeSidebar";

const xyz_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

const xy_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

export const runtimeInterfaces: RuntimeInterface[] = [
  {
    propName: "position",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },

  {
    propName: "dimensions",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xy_TemplatesArray, // 2-dimensional size, because flat
    },
    optional: true,
  },

  {
    propName: "rotation",
    typeData: {
      type: "ARRAY",
      fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },

  {
    propName: "color",
    typeData: {
      type: "STRING",
      // fieldDefinitions: xyz_TemplatesArray,
    },
    optional: true,
  },
];

const PlaneGeneric = ({
  position,
  dimensions,
  color,
}: // rotation,
{
  position: number[];
  dimensions: number[];
  // rotation: number[];
  color: string;
}) => (
  <RigidBody>
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      //   scale={[1, 1, 1]}
    >
      <planeBufferGeometry
        attach="geometry"
        args={dimensions as [number, number]}
      />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  </RigidBody>
);

export default PlaneGeneric;
