const TestBox = () => (
  <mesh>
    <boxGeometry attach="geometry" args={[5, 5, 5]} />
    <meshStandardMaterial attach="material" color={"#6be092"} />
  </mesh>
);

export default TestBox;
