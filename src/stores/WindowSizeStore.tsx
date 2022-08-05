import create, { SetState } from "zustand";

interface ISet {
  mainPane_Height: number;
  mainPane_Width: number;
  secondaryPane_Height: number;
  secondaryPane_Width: number;
  canvas_Height: number;
  canvas_Width: number;
  //
  updateMainPane: ({
    mainPane_Height,
    mainPane_Width,
  }: {
    mainPane_Height: number;
    mainPane_Width: number;
  }) => void;
  updateSecondaryPane: ({
    secondaryPane_Height,
    secondaryPane_Width,
  }: {
    secondaryPane_Height: number;
    secondaryPane_Width: number;
  }) => void;
  updateCanvasPane: ({
    canvas_Height,
    canvas_Width,
  }: {
    canvas_Height: number;
    canvas_Width: number;
  }) => void;
}

export const useWindowSizeStore = create<ISet>((set: SetState<ISet>) => ({
  mainPane_Height: 0,
  mainPane_Width: 0,
  secondaryPane_Height: 0,
  secondaryPane_Width: 0,
  canvas_Height: 0,
  canvas_Width: 0,
  //   use getBoundingClientRect on useEffect
  updateMainPane: ({
    mainPane_Height,
    mainPane_Width,
  }: {
    mainPane_Height: number;
    mainPane_Width: number;
  }) =>
    set((_state: ISet) => {
      return { mainPane_Height, mainPane_Width };
    }),
  updateSecondaryPane: ({
    secondaryPane_Height,
    secondaryPane_Width,
  }: {
    secondaryPane_Height: number;
    secondaryPane_Width: number;
  }) =>
    set((_state: ISet) => {
      return { secondaryPane_Height, secondaryPane_Width };
    }),
  updateCanvasPane: ({
    canvas_Height,
    canvas_Width,
  }: {
    canvas_Height: number;
    canvas_Width: number;
  }) =>
    set((_state: ISet) => {
      return { canvas_Height, canvas_Width };
    }),
}));
