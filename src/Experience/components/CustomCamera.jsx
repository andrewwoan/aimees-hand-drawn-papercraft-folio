import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const CustomCamera = () => {
  const { camera, pointer } = useThree();
  const curves = useCurveProgressStore((state) => state.curves);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const currentPointer = useRef(new THREE.Vector2(0, 0));

  const isInitialLerping = useRef(true);

  const cameraGroupRef = useRef();
  const cameraRef = useRef();

  useFrame(() => {
    const scrollProgressPosition =
      useCurveProgressStore.getState().scrollProgress;
    // const offsetScrollCameraPosition = (scrollProgressPosition + 0.5) % 1;

    console.log(scrollProgressPosition);

    curves.cameraPathCurve.getPointAt(
      scrollProgressPosition,
      targetPosition.current,
    );
    curves.cameraLookAtCurve.getPointAt(
      scrollProgressPosition,
      targetLookAt.current,
    );

    if (isInitialLerping.current) {
      cameraGroupRef.current.position.copy(targetPosition.current);
      cameraGroupRef.current.lookAt(targetLookAt.current);
      currentLookAt.current.copy(targetLookAt.current);

      cameraRef.current.rotation.set(0, Math.PI, 0);

      isInitialLerping.current = false;

      return;
    }

    cameraGroupRef.current.position.lerp(targetPosition.current, 0.1);
    currentLookAt.current.lerp(targetLookAt.current, 0.1);

    cameraGroupRef.current.lookAt(currentLookAt.current);

    currentPointer.current.lerp(pointer, 0.1);

    cameraRef.current.position.set(
      currentPointer.current.x * 0.1,
      currentPointer.current.y * 0.1,
      0,
    );
    cameraRef.current.rotation.set(
      -currentPointer.current.y * 0.1,
      -currentPointer.current.x * 0.1 + Math.PI,
      0,
    );
  });

  return (
    <>
      <group ref={cameraGroupRef}>
        <PerspectiveCamera makeDefault fov={50} ref={cameraRef} />
      </group>
    </>
  );
};

export default CustomCamera;
