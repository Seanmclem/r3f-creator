import { FieldDefinition } from "../components/main-ui/SelectedNodeSidebar";

export const randomString = (strLength?: number, charSet?: string) => {
  var result = [];

  strLength = strLength || 12;
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (strLength--) {
    // (note, fixed typo)
    result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
  }

  return result.join("");
};

export const xyz_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  { key: "z", type: "number" },
];

export const xy_TemplatesArray: FieldDefinition[] = [
  { key: "x", type: "number" },
  { key: "y", type: "number" },
  //   { key: "z", type: "number" },
];

export const degrees_to_radians = (degrees: number) =>
  degrees * (Math.PI / 180);
