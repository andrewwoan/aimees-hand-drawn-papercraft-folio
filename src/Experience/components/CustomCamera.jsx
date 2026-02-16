import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";
import * as THREE from "three";

const CustomCamera = () => {
  const { camera } = useThree();
  const curves = useCurveProgressStore((state) => state.curves);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const scrollProgressPosition =
      useCurveProgressStore.getState().scrollProgress;
    const offsetScrollCameraPosition = (scrollProgressPosition + 0.5) % 1;

    curves.cameraPathCurve.getPointAt(
      offsetScrollCameraPosition,
      targetPosition.current,
    );
    curves.cameraLookAtCurve.getPointAt(
      scrollProgressPosition,
      targetLookAt.current,
    );

    camera.position.lerp(targetPosition.current, 0.1);
    currentLookAt.current.lerp(targetLookAt.current, 0.1);

    camera.lookAt(currentLookAt.current);
  });

  return <></>;
};

export default CustomCamera;
