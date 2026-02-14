import * as THREE from "three";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";

export const useKTX2Texture = (
  textureUrl,
  transparent = false,
  alphaTestValue = 0.6,
  side = "front",
  flipY = false,
) => {
  const { gl } = useThree();

  const isKtx2 = textureUrl?.toLowerCase().endsWith(".ktx2");
  const LoaderClass = isKtx2 ? KTX2Loader : THREE.TextureLoader;

  // 2. Load the texture
  const texture = useLoader(LoaderClass, textureUrl, (loader) => {
    if (isKtx2) {
      loader.setTranscoderPath("/basis/");
      loader.detectSupport(gl);
    }
  });

  useEffect(() => {
    if (texture && isKtx2) {
      gl.initTexture(texture);
    }
  }, [gl, texture, isKtx2]);

  const material = useMemo(() => {
    if (!texture) return null;

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = flipY;

    texture.generateMipmaps = false;

    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent,
      alphaTest: alphaTestValue,
      side: side === "front" ? THREE.FrontSide : THREE.DoubleSide,
    });
  }, [texture, transparent, alphaTestValue, side]);

  return material;
};

useKTX2Texture.preload = (url) => {
  const isKtx2 = url?.toLowerCase().endsWith(".ktx2");
  const LoaderClass = isKtx2 ? KTX2Loader : THREE.TextureLoader;

  useLoader.preload(LoaderClass, url, (loader) => {
    if (isKtx2) {
      loader.setTranscoderPath("/basis/");
    }
  });
};
