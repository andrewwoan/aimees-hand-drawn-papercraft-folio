import { create } from "zustand";
import { createCurves } from "../Experience/components/Curves.js";

export const useResponsiveStore = create((set) => ({
  isMobile: window.innerWidth < 764,
}));

window.addEventListener("resize", () => {
  const isMobile = window.innerWidth < 764;
  useResponsiveStore.setState({ isMobile });
});
