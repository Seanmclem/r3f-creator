export const box_template = {
  children: {
    mesh: {
      children: [
        {
          boxGeometry: {
            props: [{ args: [5, 5, 5] }],
          },
        },
        {
          meshBasicMaterial: {
            props: [{ color: "blue" }],
          },
        },
      ],
    },
  },
};

export const basicCanvas1 = [box_template];
