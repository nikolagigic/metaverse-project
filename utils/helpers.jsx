const parallelTraverse = (a, b, callback) => {
  callback(a, b);

  for (let i = 0; i < a.children.length; i++) {
    parallelTraverse(a.children[i], b.children[i], callback);
  }
};

export const cloneModel = (source) => {
  const sourceLookup = new Map();
  const cloneLookup = new Map();

  const clone = source.clone();

  parallelTraverse(source, clone, (sourceNode, clonedNode) => {
    sourceLookup.set(clonedNode, sourceNode);
    cloneLookup.set(sourceNode, clonedNode);
  });

  clone.traverse((node) => {
    if (!node.isSkinnedMesh) return;

    const clonedMesh = node;
    const sourceMesh = sourceLookup.get(node);
    const sourceBones = sourceMesh.skeleton.bones;

    clonedMesh.skeleton = sourceMesh.skeleton.clone();
    clonedMesh.bindMatrix.copy(sourceMesh.bindMatrix);

    clonedMesh.skeleton.bones = sourceBones.map((bone) => {
      return cloneLookup.get(bone);
    });

    clonedMesh.bind(clonedMesh.skeleton, clonedMesh.bindMatrix);
  });

  return clone;
};

export const shortenAddress = (address) => {
  const addressStart = address.slice(0, 6);
  const addressEnd = address.slice(address.length - 4, address.length);
  return `${addressStart}...${addressEnd}`;
};
