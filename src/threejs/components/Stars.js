import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

const Stars = (scene, textureLoader) => {
  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS * 15,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );
  const map = textureLoader.load(
    `${process.env.REACT_APP_API_BASE_URL}/api/textures/milkyway_4k.jpg`
  );
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.magFilter = THREE.NearestFilter;

  const material = new THREE.MeshBasicMaterial({
    map: map,
    side: THREE.BackSide,
    color: 0x888888,
    depthWrite: false, // Prevents depth-sorting issues with the skybox
    toneMapped: false  // Keeps the colors consistent
  });
  const background = new THREE.Mesh(sphere, material);
  background.name = "background";

  scene.add(background);
  background.rotation.z += (Math.PI / 180) * 63;

  function update() {}

  return {
    update,
  };
};

export default Stars;
