import { ExtrudeGeometry, Shape, Vector2 } from "three";

class PrismGeometry extends ExtrudeGeometry {
  constructor(vertices: Vector2[], width: number) {
    super(new Shape(vertices), { depth: width, bevelEnabled: false });
  }
}

// perspective described as tapered-down-towards you

var bottomBack_depthHeight = new Vector2(0, 0); //(depth-towards-position of bottom-back, height-position of bottom-back)
var bottomFront_depthHeight = new Vector2(5, 0); // (depth-towards-position of bottom-front...higher=more-towards-you, height-position of bottom-front...higher=more-off-ground)
var topBack_depthHeight = new Vector2(0, 5); //(depth-towards-position of top-back, height-position of top-back)

var width = 10; // overall shapes-width
var geometry = new PrismGeometry(
  [bottomBack_depthHeight, bottomFront_depthHeight, topBack_depthHeight],
  width
);

export const PrismTriangle = () => (
  <mesh geometry={geometry} scale={1} position={[0, -10, -10]}>
    <meshLambertMaterial color={"pink"} />
  </mesh>
);
