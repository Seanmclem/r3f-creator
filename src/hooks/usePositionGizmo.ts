import { useState, useEffect, useCallback } from "react";
import { Vector3 } from "@react-three/fiber";

import { Matrix4, Vector3 as Vec3 } from "three";

import { useSendNodeUpdate } from "./useSendNodeUpdate";

export const usePositionGizmo = (position: number[]) => {
  const sendNodeUpdate = useSendNodeUpdate();

  const [newPosition, setNewPosition] = useState<Vector3>();

  useEffect(() => {
    // onDragEnd, position will get updated, newPosition-override will be cleared
    setNewPosition(undefined);
  }, [position]);

  const handle_onDragEnd_position = useCallback(() => {
    // LATER.. could keep a history in-store, for like, ctrl Z?

    if (newPosition) {
      sendNodeUpdate({
        key: "position",
        value: newPosition,
      });
    }

    // if (newRotation) {
    //   sendNodeUpdate({
    //     key: "rotation",
    //     value: newRotation as number[], // not using `remove_whole_numbers`, are whole numbers necessaru? Seems like maybe
    //   });
    // }
  }, [newPosition, sendNodeUpdate]);

  const handle_onDrag_position = useCallback(
    (matrix: Matrix4) => {
      // create empty vector
      const vec = new Vec3();

      // set vector to data from matrix
      vec.setFromMatrixPosition(matrix);

      // apply positions from vector, to actual position prop
      let x = position[0] + vec.x;
      let y = position[1] + vec.y;
      let z = position[2] + vec.z;
      setNewPosition([x, y, z]);
    },
    [position]
  );

  return {
    handle_onDragEnd_position,
    handle_onDrag_position,
    moving_position: newPosition,
  };
};
