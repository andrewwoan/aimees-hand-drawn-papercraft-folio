import React, { useEffect, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import * as THREE from "three/webgpu";
import * as TSL from "three/tsl";

import Scene from "./Scene";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { useRef } from "react";
import { useCurveProgressStore } from "../store/useCurveProgressStore";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
extend(THREE);

const Experience = () => {
  const setScrollProgress = useCurveProgressStore(
    (state) => state.setScrollProgress,
  );

  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = lenis?.lenis;
    if (!lenisInstance) return;

    function update(time) {
      lenisInstance.raf(time * 1000);
    }
    gsap.ticker.add(update);

    const syncScroll = (e) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress);
    };

    lenisInstance.on("scroll", syncScroll);

    return () => {
      lenisInstance.off("scroll", syncScroll);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return (
    <>
      <ReactLenis
        ref={setLenis}
        root
        options={{
          autoRaf: false,
          infinite: true,
          syncTouch: true,
        }}
      >
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
          }}
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
