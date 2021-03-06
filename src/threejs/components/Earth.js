import * as THREE from "three";
import {
  CURVE_SEGMENTS,
  GLOBE_RADIUS,
  GLOBE_SHININESS,
  GLOBE_BUMPSCALE,
} from "../helpers/constants";

const Earth = (scene, textureLoader) => {
  const geometry_sphere = new THREE.SphereGeometry(GLOBE_RADIUS, CURVE_SEGMENTS, CURVE_SEGMENTS);
  const mapTexture = textureLoader.load("https://skylinks.herokuapp.com/api/textures/earth.jpg");
  const bumbMapTexture = textureLoader.load(
    "https://skylinks.herokuapp.com/api/textures/elev_bump_4k.jpg"
  );

  const specularMap = textureLoader.load(
    "https://skylinks.herokuapp.com/api/textures/water_4k.png"
  );

  const material = new THREE.MeshPhongMaterial({
    map: mapTexture,
    bumpMap: bumbMapTexture,
    bumpScale: GLOBE_BUMPSCALE,
    specularMap: specularMap,
    specular: new THREE.Color("grey"),
    shininess: GLOBE_SHININESS,
  });

  const earth = new THREE.Mesh(geometry_sphere, material);
  earth.name = "earth";

  scene.add(earth);

  function update() {}

  return {
    update,
  };
};

export default Earth;
