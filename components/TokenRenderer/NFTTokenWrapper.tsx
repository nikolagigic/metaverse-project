import { FC, useEffect, useState, Suspense, useLayoutEffect } from "react";

import { Canvas, useThree, ColorProps } from "@react-three/fiber";
import {
  Stats,
  PerspectiveCamera,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";

import TokenRenderer from "./TokenRenderer";

import * as THREE from "three";

interface NFTTokenWrapperProps {
  modelPath: string;
  backgroundColor?: string;
}

const Precompile: FC = (): null => {
  const { gl, scene, camera } = useThree();
  useLayoutEffect(() => gl.compile(scene, camera), [gl, scene, camera]);
  return null;
};

const NFTTokenWrapper: FC<NFTTokenWrapperProps> = ({
  modelPath,
  backgroundColor,
}) => {
  const [pixelRatio, setPixelRatio] = useState(null);
  const [widthSize, setWidthSize] = useState(0);
  const [heightSize, setHeightSize] = useState(0);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
    setWidthSize(window.innerWidth);
    setHeightSize(window.innerHeight);
  }, []);

  return (
    <Canvas
      mode="concurrent"
      performance={{ current: 1, min: 0.1, max: 1, debounce: 200 }}
      gl={{
        alpha: true,
        antialias: true,
        pixelRatio: pixelRatio,
        outputEncoding: THREE.sRGBEncoding,
      }}
      camera={{
        position: [0, 1, 3],
        fov: 45,
        aspect: widthSize / heightSize,
      }}
    >
      <ambientLight />
      <pointLight position={[0, 2, 2]} />
      <Suspense fallback={null}>
        <OrbitControls />
        <TokenRenderer
          position={[0, -1, 0]}
          modelPath={modelPath}
          backgroundColor={backgroundColor}
        />
      </Suspense>
      <Precompile />
      <Stats />
    </Canvas>
  );
};

export default NFTTokenWrapper;
