import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { ExportedTree } from "./components/ExportedTree";

const App = () => {
  return (
    <Canvas
      // style={{ height, width: width - 300 }}
      camera={{ fov: 75, position: [10, 8, 10] }}
    >
      <OrbitControls makeDefault />
      {/* <ambientLight intensity={0.5} /> */}
      <directionalLight position={[10, 15, 10]} />
      <ExportedTree />
    </Canvas>
  );
};

export default App;
