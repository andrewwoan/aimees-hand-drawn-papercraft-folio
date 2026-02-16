import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFrame, useThree } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useMemo, useRef } from "react";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CustomCamera = () => {
  const { camera } = useThree();
  const curves = useCurveProgressStore((state) => state.curves);
  const setScrollProgress = useCurveProgressStore(
    (state) => state.setScrollProgress,
  );

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#dummy-scroll-div",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, []);

  useFrame(() => {
    const scrollProgressPosition =
      useCurveProgressStore.getState().scrollProgress;

    const offsetScrollCameraPosition = (scrollProgressPosition + 0.5) % 1;

    const cameraCurvePosition = curves.cameraPathCurve.getPointAt(
      offsetScrollCameraPosition,
    );

    const cameraLookAtCurvePosition = curves.cameraLookAtCurve.getPointAt(
      scrollProgressPosition,
    );

    camera.position.copy(cameraCurvePosition);
    camera.lookAt(cameraLookAtCurvePosition);
  });

  return <></>;
};

export default CustomCamera;
