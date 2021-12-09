import { FC, Suspense, useEffect, useLayoutEffect, useState } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

import { Grid } from "@mui/material";

import TokenRenderer from "../components/TokenRenderer";

import * as THREE from "three";

const Precompile: FC = (): null => {
  const { gl, scene, camera } = useThree();
  useLayoutEffect(() => gl.compile(scene, camera), [gl, scene, camera]);
  return null;
};

const Token = () => {
  const [pixelRatio, setPixelRatio] = useState(null);
  const [widthSize, setWidthSize] = useState(0);
  const [heightSize, setHeightSize] = useState(0);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
    setWidthSize(window.innerWidth);
    setHeightSize(window.innerHeight);
  }, []);

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12}>
        <Canvas
          mode="concurrent"
          performance={{ current: 1, min: 0.1, max: 1, debounce: 200 }}
          gl={{
            antialias: true,
            pixelRatio: pixelRatio,
            outputEncoding: THREE.sRGBEncoding,
          }}
        >
          <ambientLight intensity={2} />
          <Suspense fallback={null}>
            <group dispose={null}>
              <TokenRenderer
                position={[0, 0, 0]}
                modelPath={"/gltf/Y Bot - Idle.glb"}
              />
            </group>
            <Precompile />
          </Suspense>
          <Stats />
        </Canvas>
      </Grid>
    </Grid>
  );
};

export default Token;
