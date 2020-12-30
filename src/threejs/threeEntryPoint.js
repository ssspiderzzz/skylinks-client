import SceneManager from "./SceneManager";

const ThreeEntryPoint = threeRootRef => {
  const canvas = document.createElement("canvas");
  threeRootRef.appendChild(canvas);
  const sceneManager = new SceneManager(canvas);

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.onmousedown = selectRoute;
    window.onresize = resizeCanvas;
    canvas.onmouseenter = mouseEnter;
    canvas.onmouseleave = mouseLeave;
    resizeCanvas();
  }

  function mouseEnter(event) {
    sceneManager.onMouseEnter(event);
  }
  function mouseLeave(event) {
    sceneManager.onMouseLeave(event);
  }
  function selectRoute(event) {
    sceneManager.onMouseDown(event);
  }

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }
  function render() {
    sceneManager.update();
    requestAnimationFrame(render);
  }
  return sceneManager;
};

export default ThreeEntryPoint;
