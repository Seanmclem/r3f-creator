export const box_template = {
  tagName: "Fragment", // Makes <></>
  children: [
    {
      tagName: "mesh",
      children: [
        {
          tagName: "boxGeometry",
          props: [{ args: [5, 5, 5] }],
          children: [],
        },
        {
          tagName: "meshBasicMaterial",
          props: [{ color: "blue" }],
          children: [],
        },
      ],
    },
  ],
};

export const basicCanvas1 = [box_template];
