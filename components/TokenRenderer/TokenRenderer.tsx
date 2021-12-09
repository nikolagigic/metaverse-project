import React, { FC, useRef, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

import { cloneModel } from "../../utils/helpers";

import * as THREE from "three";

interface TokenRendererProps {
  position: [x: number, y: number, z: number];
  modelPath: string;
}

interface MeshProps {
  rotation: { x: number; y: number; z: number };
}

const TokenRenderer: FC<TokenRendererProps> = ({ position, modelPath }) => {
  const mesh = useRef<MeshProps>();
  const gltfModel = useGLTF(modelPath);
  const animations = useAnimations(gltfModel.animations);
  let mixer: THREE.AnimationMixer;
  const clone = useMemo(() => cloneModel(gltfModel.scene), [gltfModel.scene]);

  if (animations?.clips.length) {
    mixer = new THREE.AnimationMixer(clone);
    animations.clips.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((state, delta) => {
    mesh.current.rotation.y += 0.01;
    mixer?.update(delta);
  });

  return (
    <mesh ref={mesh} position={position}>
      <primitive object={clone} scale={1} dispose={null} />
    </mesh>
  );
};

export default TokenRenderer;
