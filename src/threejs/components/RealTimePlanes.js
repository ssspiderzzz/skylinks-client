import * as THREE from "three";

const RealTimePlanes = (points) => {
  var textureLoader = new THREE.TextureLoader();

  // let counter = 0;

  // let dir = new THREE.Vector3();
  // dir.subVectors(points[0], points[points.length - 1]).normalize();

  let geo = new THREE.PlaneGeometry(1, 1, 1);
  let mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(
      `${process.env.REACT_APP_API_BASE_URL}/api/textures/plane.png`
    ),
    transparent: true,
  });
  let plane = new THREE.Mesh(geo, mat);

  return plane;

  // function moveontrack() {
  //   if (counter <= 1) {
  //     plane.position.copy(points[Math.floor(counter * points.length)]);

  //     counter += 0.005;
  //   } else {
  //     counter = 0;
  //   }
  // }
};

export default RealTimePlanes;
