import SceneManager from "./SceneManager";

export default function ThreeEntryPoint(threeRootRef) {
  const canvas = document.createElement("canvas");
  threeRootRef.appendChild(canvas);
  const sceneManager = new SceneManager(canvas);

  window.onresize = resizeCanvas;
  canvas.onmousedown = mouseDown;
  canvas.onmouseenter = mouseEnter;
  canvas.onmouseleave = mouseLeave;
  resizeCanvas();
  render();

  function mouseEnter(event) {
    sceneManager.onMouseEnter(event);
  }
  function mouseLeave(event) {
    sceneManager.onMouseLeave(event);
  }
  function mouseDown(event) {
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
}
