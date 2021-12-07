import React, { FC, useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface TokenRendererProps {
  position: [x: number, y: number, z: number];
  modelPath: string;
}

interface MeshProps {
  rotation: { x: number; y: number; z: number };
}

const TokenRenderer: FC<TokenRendererProps> = ({ position, modelPath }) => {
  const mesh = useRef<MeshProps>();
  const model = useLoader(GLTFLoader, modelPath);

  useFrame((state, delta) => {
    mesh.current.rotation.y += 0.01;
  });

  return <primitive ref={mesh} object={model.scene} scale={1} dispose={null} />;
};

export default TokenRenderer;
