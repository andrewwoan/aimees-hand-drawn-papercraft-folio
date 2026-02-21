import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function AnimateMesh({
  children,
  animations,
  property = "rotation",
  axis = "y",
  speed = 1,
  amplitude = 0.3,
  offset = 0,
  base = 0,
  position,
}) {
  const ref = useRef();

  const resolvedAnimations = animations ?? [
    { property, axis, speed, amplitude, offset, base },
  ];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    resolvedAnimations.forEach(
      ({
        property = "rotation",
        axis = "y",
        speed = 1,
        amplitude = 0.3,
        offset = 0,
        base = 0,
      }) => {
        ref.current[property][axis] =
          base + amplitude * Math.sin(clock.elapsedTime * speed + offset);
      },
    );
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}
