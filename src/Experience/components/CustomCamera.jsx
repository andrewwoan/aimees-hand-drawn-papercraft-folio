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
    gsap.to(scrollProgress.current, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#dummy-scroll-div",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  useFrame(() => {
    const scrollProgressPosition = scrollProgress.current.progress;

    const cameraCurvePosition = curves.cameraPathCurve.getPointAt(
      scrollProgressPosition,
    );

    camera.position.copy(cameraCurvePosition);
  });

  return <></>;
};

export default CustomCamera;
