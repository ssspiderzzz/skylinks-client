import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";
import {
  DirectionalLightX,
  DirectionalLightY,
  DirectionalLightZ,
} from "../helpers/constants";

const Sun = (scene, textureLoader) => {
  const sunSize = GLOBE_RADIUS * 0.5;

  const sphere = new THREE.SphereGeometry(
    sunSize,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Bright white core
    emissive: 0xfdb813, // Sun-yellow emission
    emissiveIntensity: 2, // Over-brighten it for the "physical" look
  });

  const sun = new THREE.Mesh(sphere, material);

  const glowTexture = textureLoader.load(
    `${process.env.REACT_APP_API_BASE_URL}/api/textures/glow.png`
  );
  // Visual textures (like a sun glow) must be SRGBColorSpace in newer Three.js
  glowTexture.colorSpace = THREE.SRGBColorSpace;

  var spriteMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xfdb813,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(sunSize * 5, sunSize * 5, 1);
  sun.add(sprite); // this centers the glow at the mesh

  sun.name = "sun";
  scene.add(sun);
  sun.position.set(DirectionalLightX, DirectionalLightY, DirectionalLightZ);

  function update(time) {
    if (sprite) {
      const scale = 15 + Math.sin(time * 0.002) * 0.5;
      sprite.scale.set(sunSize * scale, sunSize * scale, 1);
    }
  }

  return {
    update,
  };
};

export default Sun;
