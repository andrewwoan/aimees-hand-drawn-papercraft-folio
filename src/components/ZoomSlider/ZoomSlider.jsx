import React from "react";
import "./ZoomSlider.css";
import { useCameraStore } from "../../store/useCameraStore";

const ZoomSlider = () => {
  const setZoom = useCameraStore((state) => state.setZoom);

  return (
    <>
      <input
        type="range"
        className="zoom-slider"
        min={1}
        max={3}
        step={0.01}
        defaultValue={1}
        onChange={(e) => setZoom(parseFloat(e.target.value))}
      />
    </>
  );
};

export default ZoomSlider;
