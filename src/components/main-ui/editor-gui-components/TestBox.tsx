import { PivotControls } from "@react-three/drei";

const TestBox = () => (
  // use on-drag-end, update position from ref
  // I think, I can use a global signal, containing an object, with keys that are ID of the node...
  // declare ref here, on first useEffect, set it to global signal,
  // selectedNode Sidebar imports ref lazy/dynamically, get updates from the ref ...

  // OR just use signal/ZUSTAND for the actual position data,
  // OR store refs in zustand, on an object based on the uuid of component, onDragEnd, do last updated.
  // Abstract to pivot controls component, takes "updatedProps" array, conpares to pros on ref

  <PivotControls scale={3} anchor={[-0.25, 1.2, -0.25]}>
    <mesh>
      <boxGeometry attach="geometry" args={[5, 5, 5]} />
      <meshStandardMaterial attach="material" wireframe />
    </mesh>
  </PivotControls>
);

export default TestBox;
