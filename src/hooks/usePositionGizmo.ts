import { useState, useEffect, useCallback } from "react";
import { Vector3 } from "@react-three/fiber";

import { Euler, Matrix4, Object3D, Vector3 as Vec3, Event } from "three";

import { useSendNodeUpdate } from "./useSendNodeUpdate";

const detect_MoveOnly = ({ x, y, z }: { x: number; y: number; z: number }) => {
  let count = 0;
  if (x !== 0) {
    count++;
  }
  if (y !== 0) {
    count++;
  }
  if (z !== 0) {
    count++;
  }
  return count === 1;
};

export const usePositionGizmo = (position: number[], rotation?: number[]) => {
  const sendNodeUpdate = useSendNodeUpdate();

  const [newPosition, setNewPosition] = useState<Vector3>();
  const [newRotation, setNewRotation] = useState<Vector3>();

  useEffect(() => {
    // onDragEnd, position will get updated, newPosition-override will be cleared
    setNewPosition(undefined);
  }, [position]);

  useEffect(() => {
    // onDragEnd, position will get updated, newRotation-override will be cleared
    setNewRotation(undefined);
  }, [rotation]);

  const handle_onDragEnd_position = useCallback(() => {
    // LATER.. could keep a history in-store, for like, ctrl Z?

    if (newPosition) {
      sendNodeUpdate({
        key: "position",
        value: newPosition,
      });
    }
  }, [newPosition, sendNodeUpdate]);

  const handle_onDragEnd_rotation = useCallback(() => {
    // LATER.. could keep a history in-store, for like, ctrl Z?

    if (newRotation) {
      sendNodeUpdate({
        key: "rotation",
        value: newRotation as number[], // not using `remove_whole_numbers`, are whole numbers necessaru? Seems like maybe
      });
    }
  }, [newRotation, sendNodeUpdate]);

  const handle_onDrag_rotation = useCallback(
    (matrix: Matrix4, meshRef: React.RefObject<Object3D<Event>>) => {
      // apply rotations from matrix
      const euler = new Euler();
      euler.setFromRotationMatrix(matrix);
      console.log({ "meshRef.current": meshRef.current, rotation });
      if (meshRef.current && rotation) {
        setNewRotation([
          (euler.x || meshRef?.current?.rotation.x) + rotation[0],
          (euler.y || meshRef?.current?.rotation.y) + rotation[1],
          (euler.z || meshRef?.current?.rotation.z) + rotation[2],
        ]);
      } else {
        console.error({ "Something is undefined:": meshRef.current, rotation });
      }
    },
    [rotation]
  );

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

  const handle_onDrag_both = useCallback(
    (matrix: Matrix4, meshRef: React.RefObject<Object3D<Event>>) => {
      // create empty vector
      const vec = new Vec3();

      // set vector to data from matrix
      vec.setFromMatrixPosition(matrix);

      if (detect_MoveOnly(vec)) {
        handle_onDrag_position(matrix);
      } else {
        console.log("ROTATE ONLY");
        handle_onDrag_rotation(matrix, meshRef);
      }
    },
    [handle_onDrag_position, handle_onDrag_rotation]
  );

  const handle_onDragEnd_rotation_AND_position = () => {
    // LATER.. could keep a history in-store, for like, ctrl Z?

    handle_onDragEnd_position();
    handle_onDragEnd_rotation();
  };

  return {
    handle_onDragEnd_rotation_AND_position,
    handle_onDragEnd_rotation,
    handle_onDragEnd_position,
    handle_onDrag_position,
    // No handle_onDrag_ROTATION ?
    handle_onDrag_both,
    moving_position: newPosition,
    moving_rotation: newRotation,
  };
};
