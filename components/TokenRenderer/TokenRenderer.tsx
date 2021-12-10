import React, { FC, useRef, useMemo, useEffect, useState } from "react";

import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

import { cloneModel } from "../../utils/helpers";

import * as THREE from "three";

interface TokenRendererProps {
  position: [x: number, y: number, z: number];
  modelPath: string;
  backgroundColor?: string;
}

interface MeshProps {
  rotation: { x: number; y: number; z: number };
}

const TokenRenderer: FC<TokenRendererProps> = ({
  position,
  modelPath,
  backgroundColor,
}) => {
  const mesh = useRef<MeshProps>();
  const gltfModel = useGLTF(modelPath);
  const animations = useAnimations(gltfModel.animations);
  let mixer: THREE.AnimationMixer;
  const clone = useMemo(() => cloneModel(gltfModel.scene), [gltfModel.scene]);

  const [sceneColor, setSceneColor] = useState(0x00000);

  if (animations?.clips.length) {
    mixer = new THREE.AnimationMixer(clone);
    animations.clips.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useEffect(() => {
    setSceneColor(Number(backgroundColor?.replace("#", "0x")));
  }, [backgroundColor]);

  useFrame((state, delta) => {
    state.scene.background = new THREE.Color().setHex(sceneColor);
    mesh.current.rotation.y += 0.01;
    mixer?.update(delta);
  });

  return (
    <group>
      <mesh ref={mesh} position={position}>
        <primitive object={clone} scale={1} dispose={null} />
      </mesh>
    </group>
  );
};

export default TokenRenderer;
