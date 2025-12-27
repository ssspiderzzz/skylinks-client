import * as THREE from "three";
import { SRGBColorSpace, NoColorSpace } from 'three';
import {
  CURVE_SEGMENTS,
  GLOBE_RADIUS,
  GLOBE_SHININESS,
  GLOBE_BUMPSCALE,
} from "../helpers/constants";

const Earth = (scene, textureLoader) => {
  const geometry_sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );
  const mapTexture = textureLoader.load(
    `${process.env.REACT_APP_API_BASE_URL}/api/textures/earth.jpg`
  );
  const bumbMapTexture = textureLoader.load(
    `${process.env.REACT_APP_API_BASE_URL}/api/textures/elev_bump_4k.jpg`
  );

  const specularMap = textureLoader.load(
    `${process.env.REACT_APP_API_BASE_URL}/api/textures/water_4k.png`
  );

  mapTexture.colorSpace = SRGBColorSpace;
  mapTexture.needsUpdate = true;

  if (bumbMapTexture) {
    bumbMapTexture.colorSpace = NoColorSpace;
    bumbMapTexture.needsUpdate = true;
  }

  if (specularMap) {
    specularMap.colorSpace = SRGBColorSpace; 
    specularMap.needsUpdate = true;
  }

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
