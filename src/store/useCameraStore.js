import { create } from "zustand";
import { createCurves } from "../Experience/components/Curves.js";

export const useCameraStore = create((set) => ({
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
}));
