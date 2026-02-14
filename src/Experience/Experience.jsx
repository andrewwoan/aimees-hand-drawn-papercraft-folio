import React from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three/webgpu";
import * as TSL from "three/tsl";

import Scene from "./Scene";

extend(THREE);

const Experience = () => {
  return (
    <Canvas
      camera={{ fov: 50 }}
      flat={true}
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer({
          ...props,
          logarithmicDepthBuffer: true,
        });
        await renderer.init();
        return renderer;
      }}
    >
      <Scene />
      <OrbitControls />
    </Canvas>
  );
};

export default Experience;
