import { useMemo } from "react";

interface props {
  height?: number | string;
  width?: number | string;
  color?: string;
}

export const Spacer: React.FC<props> = ({ height, width, color }) => {
  return useMemo(() => {
    return (
      <div
        style={{
          height: height || "auto",
          width: width || "auto",
          backgroundColor: color || "transparent",
          alignSelf: width === "100%" ? "stretch" : "auto",
        }}
      ></div>
    );
  }, [height, width, color]);
};
