import { FC, useEffect, useState, Suspense, useLayoutEffect } from "react";

import { useRouter } from "next/router";

import { Canvas, useThree } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

import TokenRenderer from "./TokenRenderer";

import * as THREE from "three";

interface NFTTokenWrapperProps {
  modelPath: string;
  backgroundColor?: string;
  name?: string;
  description?: string;
  addedPrice?: string;
}

const Effects = () => {
  return (
    <EffectComposer>
      <Vignette offset={0.25} darkness={0.5} eskil={false} />
    </EffectComposer>
  );
};

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

  const location = useRouter();

  const shouldRenderEffects =
    location.pathname.startsWith("/studio") ||
    location.pathname.startsWith("/token");

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
    setWidthSize(window.innerWidth);
    setHeightSize(window.innerHeight);
  }, []);

  return (
    <Canvas
      performance={{ current: 1, min: 0.1, max: 1, debounce: 200 }}
      gl={{
        alpha: true,
        antialias: true,
        pixelRatio: pixelRatio,
        outputEncoding: THREE.sRGBEncoding,
        depth: true,
      }}
      camera={{
        position: [0, 1, 3],
        fov: 45,
        aspect: widthSize / heightSize,
      }}
    >
      <ambientLight />
      <spotLight position={[5, 5, 5]} intensity={0.15} />
      <spotLight position={[-5, 5, 5]} intensity={0.15} />
      <spotLight position={[0, 5, 5]} intensity={0.15} />
      {shouldRenderEffects && <Effects />}
      <Suspense fallback={null}>
        <OrbitControls />
        <TokenRenderer
          position={[0, -1, -0.25]}
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
