import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default function Clouds(scene, textureLoader) {
  const sphere = new THREE.SphereGeometry(GLOBE_RADIUS + 0.1, CURVE_SEGMENTS, CURVE_SEGMENTS);

  const material = new THREE.MeshPhongMaterial({
    map: textureLoader.load("https://skylinks.herokuapp.com/api/textures/fair_clouds_4k.png"),
    opacity: 0.7,
    transparent: true,
  });

  const clouds = new THREE.Mesh(sphere, material);
  clouds.name = "clouds";

  scene.add(clouds);

  function update(time) {
    clouds.rotation.y += 0.0002;
  }

  return {
    update,
  };
}
