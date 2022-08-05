import React from "react";
import { useMemo } from "react";

interface props {
  height?: number | string;
  width?: number | string;
  color?: string;
}

export const Spacer: React.FC<props> = ({ height, width, color }) => {
  return useMemo(() => {
    const styles = {
      height: height || "auto", // no height? Use "auto" if width, else 20
      width: width || "auto",
      backgroundColor: color || "transparent",
      alignSelf: width === "100%" ? "stretch" : "auto",
    };

    return <div style={styles}></div>;
  }, [height, width, color]);
};
