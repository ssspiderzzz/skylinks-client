import * as THREE from "three";
import { DirectionalLightX, DirectionalLightY, DirectionalLightZ } from "../helpers/constants";

const GeneralLights = (scene) => {
  // Ambient light
  let lightA = new THREE.AmbientLight(0x444444);
  scene.add(lightA);
  // Directional light
  let lightD = new THREE.DirectionalLight(0xffffff, 1);
  lightD.position.set(DirectionalLightX, DirectionalLightY, DirectionalLightZ);
  scene.add(lightD);

  function update() {}

  return {
    update,
  };
};

export default GeneralLights;
