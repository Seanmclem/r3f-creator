import { PivotControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useSnapshot } from "valtio";
import { usePositionGizmo } from "../../../../hooks/usePositionGizmo";
import { useSelectComponent } from "../../../../hooks/useSelectComponent";
import { editorNodeState } from "../../../../stores/editorNodeProxy";
import { FieldDefinition, RuntimeInterface } from "../../SelectedNodeSidebar";

const xyz_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

const xy_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  //   { key: "z", type: "number" },
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
  idx, //custom
  uid, // custom
  nodeItem, // custom
  //
  position,
  dimensions,
  color,
}: // rotation,
{
  idx: number; // custome
  uid: string; // custom
  nodeItem: any; // custom
  //
  position: number[];
  dimensions: number[];
  // rotation: number[];
  color: string;
}) => {
  const editorNodeStateObject = useSnapshot(editorNodeState);
  const specificNode = editorNodeStateObject[uid];

  const { handle_select_component } = useSelectComponent({ idx, nodeItem });

  const { handle_onDragEnd_position, handle_onDrag_position, moving_position } =
    usePositionGizmo(position);

  return (
    <PivotControls
      depthTest={false}
      autoTransform={false}
      disableRotations
      scale={3}
      anchor={[0, 0, 0]}
      //onDragStart={handle_onDragStart} //, maybe grab, set, and apply initial rotation on each onDrag. Won't compound it.
      onDragEnd={handle_onDragEnd_position}
      onDrag={handle_onDrag_position}
      visible={!!specificNode?.showPivotControls}
      disableSliders
    >
      <RigidBody>
        <mesh
          position={moving_position || position}
          rotation={[-Math.PI / 2, 0, 0]}
          //   scale={[1, 1, 1]}
          onClick={handle_select_component}
        >
          <planeBufferGeometry
            attach="geometry"
            args={dimensions as [number, number]}
          />
          <meshPhongMaterial attach="material" color={color} />
        </mesh>
      </RigidBody>
    </PivotControls>
  );
};

export default PlaneGeneric;
