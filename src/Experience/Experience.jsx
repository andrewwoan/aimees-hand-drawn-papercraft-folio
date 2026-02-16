import React, { useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three/webgpu";
import * as TSL from "three/tsl";

import Scene from "./Scene";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { useRef } from "react";

extend(THREE);

const Experience = () => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          autoRaf: false,
          infinite: true,
        }}
      >
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
          }}
          camera={{ fov: 50 }}
          flat
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
          {/* <OrbitControls /> */}
          <color attach="background" args={["#111111"]} />
        </Canvas>
        <div
          style={{ height: "1000vh", width: "100%", pointerEvents: "none" }}
          id="dummy-scroll-div"
        ></div>
      </ReactLenis>
    </>
  );
};

export default Experience;
