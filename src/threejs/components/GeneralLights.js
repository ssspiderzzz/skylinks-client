import * as THREE from "three";
import { DirectionalLightX, DirectionalLightY, DirectionalLightZ } from "../helpers/constants";

const GeneralLights = (scene) => {
  // Ambient light
  let lightA = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(lightA);
  // Directional light
  let lightD = new THREE.DirectionalLight(0xffffff, 5);
  lightD.position.set(DirectionalLightX, DirectionalLightY, DirectionalLightZ);
  scene.add(lightD);

  function update() {}

  return { update };
};

export default GeneralLights;
