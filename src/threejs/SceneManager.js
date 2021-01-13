import * as THREE from "three";
import Earth from "./components/Earth";
import StarsBackGround from "./components/Stars";
import Clouds from "./components/Clouds";
import Sun from "./components/Sun";
import FlightRoutes from "./components/BuildFlightRoutes";
import FlightRealRoutes from "./components/RealTimeFlightRoutes";
import GeneralLights from "./components/GeneralLights";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { coordinateToPosition } from "./helpers/curve";
import { TOTAL_ITEMS, LOADING_ITEMS_UPDATE, LOADING_STATUS_UPDATE } from "../store/reducer";
import store from "../store";

export default function SceneManager(canvas) {
  const clock = new THREE.Clock();
  var gltfLoader = new GLTFLoader();

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const controls = buildControls(camera, renderer.domElement);
  const loadingManager = buildLoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const sceneSubjects = createSceneSubjects(scene, textureLoader);
  createPlane(scene);
  let airPlaneRoot = "";
  let sceneRoutes = [];
  let sceneRealRoute = [];

  function createPlane(scene) {
    gltfLoader.load("https://skylinks.herokuapp.com/with-cors/scene.gltf", (gltf) => {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.name = "airPlaneParts";
          child.rotation.set((Math.PI / 180) * 0, (Math.PI / 180) * 0, (Math.PI / 180) * 0);
          child.geometry.center(); // center here
        }
      });
      const root = gltf.scene;
      root.scale.set(0.00001, 0.00001, 0.00001);
      root.name = "real3d";
      scene.add(root);

      return root;

      // compute the box that contains all the stuff
      // from root and below
    });
  }

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFF");

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: "high-performance",
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    return renderer;
  }

  function buildControls(camera, domElement) {
    var controls = new OrbitControls(camera, domElement);
    controls.minPolarAngle = -Math.PI;
    controls.maxPolarAngle = Math.PI;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 40;
    controls.minDistance = 6;
    controls.enablePan = false;
    controls.enabled = false;
    controls.target.set(0, 0.6, 0);

    return controls;
  }

  function buildCamera({ width, height }) {
    const fieldOfView = 65;
    const aspectRatio = width / height;
    const nearPlane = 0.2;
    const farPlane = 10000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.z = 10;
    return camera;
  }

  function buildLoadingManager() {
    let manager = new THREE.LoadingManager();
    manager.onStart = function () {
      console.log("Started loading file.");
    };
    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files."
      );
      store.dispatch({ type: TOTAL_ITEMS, itemsTotal: itemsTotal });
      store.dispatch({ type: LOADING_ITEMS_UPDATE, itemsLoaded: itemsLoaded });
    };
    manager.onLoad = function () {
      console.log("Loading complete!");
      setTimeout(() => {
        store.dispatch({ type: LOADING_STATUS_UPDATE, loadingCompleted: true });
      }, 3000);
    };
    return manager;
  }

  function createSceneSubjects(scene, textureLoader) {
    const sceneSubjects = [
      new Earth(scene, textureLoader),
      new Clouds(scene, textureLoader),
      new Sun(scene, textureLoader),
      new StarsBackGround(scene, textureLoader),
      new GeneralLights(scene),
    ];

    return sceneSubjects;
  }

  function createSceneRoute(scene, airport) {
    return [new FlightRoutes(scene, airport)];
  }
  function createSceneRealRoute(scene, airport) {
    return [new FlightRealRoutes(scene, airport)];
  }

  function addEntity(airport) {
    if (airport.waypoints.length > 1) {
      sceneRealRoute.push(createSceneRealRoute(scene, airport.waypoints));
    } else {
      sceneRoutes.push(createSceneRoute(scene, airport));
    }
  }

  function clearRoutes(obj) {
    var children_to_remove = [];

    obj &&
      obj.traverse((line) => {
        if (line.type === "Line") {
          children_to_remove.push(line);
        }
      });
    //remove all children
    children_to_remove.forEach(function (child) {
      scene.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    });

    sceneRoutes.length = 0;
    scene.remove(obj);
  }

  function clearWaypoints(obj) {
    var children_to_remove = [];
    obj &&
      obj.traverse((line) => {
        if (line.name === "waypointsLine") {
          children_to_remove.push(line);
        }
      });
    //remove all children
    children_to_remove.forEach(function (child) {
      scene.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    });

    sceneRealRoute.length = 0;
    scene.remove(obj);
  }

  function clear() {
    var selectedObject = "";
    if (scene.getObjectByName("routes")) {
      selectedObject = scene.getObjectByName("routes");
      clearRoutes(selectedObject);
    } else if (scene.getObjectByName("realRoute")) {
      selectedObject = scene.getObjectByName("realRoute");
      clearWaypoints(selectedObject);
    }
  }

  function update() {
    if (!airPlaneRoot) {
      airPlaneRoot = scene.getObjectByName("real3d");
    }
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].update(elapsedTime);
    }
    controls.update();
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }
  function onMouseLeave(event) {
    controls.enabled = false;
  }

  function onMouseEnter(event) {
    controls.enabled = true;
  }

  function onMouseDown(event) {
    let mouse3D = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    let raycaster = new THREE.Raycaster();
    raycaster.linePrecision = 0.1;
    raycaster.setFromCamera(mouse3D, camera);
    // find the object that we want to intersect

    let routes = scene.getObjectByName("routes");
    if (routes) {
      let intersects = raycaster.intersectObjects(routes.children);
      if (intersects.length > 0) {
        let selectedElement = document.getElementById(
          `${intersects[0].object.departure_fs}_${intersects[0].object.arrival_fs}`
        );
        selectedElement.focus();
        // change color and corresponding list item on click
        selectedElement.style.background = "PaleGreen";
        intersects[0].object.material.color.setHex(0x98fb98);
        intersects[0].object.material.opacity = 1;
        setTimeout(() => {
          selectedElement.style.background = "";
          intersects[0].object.material.color.setHex(0xe85d33);
          intersects[0].object.material.opacity = 0.7;
        }, 1000);
      }
    }
  }

  const clearAirPlane3d = () => {
    if (airPlaneRoot) {
      console.log("clear");
      airPlaneRoot.position.set(0, 0, 0);
    }
  };

  function updatePosition(position, waypoints) {
    const plane = scene.getObjectByName("realTimePlane");
    // const center = new THREE.Vector3(0, 0, 0);
    if (airPlaneRoot && plane) {
      airPlaneRoot.points = plane.points;
      const index = airPlaneRoot.points.length - 2;
      const current = Math.floor((position / 100) * index);
      airPlaneRoot.up = new THREE.Vector3(0, 1, 0);
      const endPosition = coordinateToPosition(
        waypoints[waypoints.length - 1].position.latitude,
        waypoints[waypoints.length - 1].position.longitude,
        5
      );
      console.log(endPosition);
      airPlaneRoot.position.lerp(airPlaneRoot.points[current], 1);

      airPlaneRoot.lookAt(airPlaneRoot.points[current + 1]);
      airPlaneRoot.rotation.z = -(Math.PI / 180) * 320;
    } else if (plane) {
      const index = plane.points.length - 1;
      const current = Math.floor((position / 100) * index);
      plane.position.lerp(plane.points[current], 1);
      plane.rotation.z = (Math.PI / 180) * waypoints[current].position.direction;
      // axis.crossVectors(up, plane.points[current]).normalize();
      // plane.quaternion.setFromAxisAngle(
      //   new THREE.Vector3(0, 1, 0),
      //   (Math.PI / 180) * waypoints[current].position.direction
      // );

      // plane.quaternion.setFromUnitVectors(
      //   plane.points[current],
      //   plane.points[current + 10]
      // );
    }
  }

  return {
    update,
    onWindowResize,
    onMouseDown,
    clear,
    addEntity,
    onMouseEnter,
    onMouseLeave,
    updatePosition,
    clearAirPlane3d,
  };
}
