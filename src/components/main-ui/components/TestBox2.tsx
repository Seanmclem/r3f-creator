const Box2 = ({ position }: { position: number[] }) => (
  <mesh position={position as any}>
    <boxGeometry args={[5, 5, 5]} />
    <meshBasicMaterial color={"chucknorris"} />
  </mesh>
);

export default Box2;
