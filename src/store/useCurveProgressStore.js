import { create } from "zustand";
import { createCurves } from "../Experience/components/Curves.js";

export const useCurveProgressStore = create((set) => ({
  curves: createCurves(),
  scrollProgress: 0,
  setScrollProgress: (value) => set((state) => ({ scrollProgress: value })),
}));
