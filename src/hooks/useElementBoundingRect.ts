import { useLayoutEffect } from "react";
import { useWindowSizeStore } from "../stores/WindowSizeStore";

export const useElementBoundingRect = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  selectedNode: any,
  area: "PRIMARY" | "SECONDARY" | "CANVAS"
) => {
  const updateSecondaryPane = useWindowSizeStore(
    (state) => state.updateSecondaryPane
  );

  useLayoutEffect(() => {
    const maybeRects = ref.current?.getBoundingClientRect();
    if (area === "SECONDARY") {
      updateSecondaryPane({
        secondaryPane_Height: maybeRects?.height || 0,
        secondaryPane_Width: maybeRects?.width || 0,
      });
    }
    console.log({ maybeRects });
  }, [ref, selectedNode, updateSecondaryPane, area]);

  return null;
};
