import { CanvasRenderer } from './canvas-renderer';
import { GravitySimulation } from './gravity-simulation';

const renderer = new CanvasRenderer('canvas');
let simulation: GravitySimulation;

let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function animate(currentTime: number) {
  if (currentTime - lastTime >= frameInterval) {
    simulation.update();
    simulation.render();
    lastTime = currentTime;
  }
  requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
  renderer.resize();
  simulation = new GravitySimulation(renderer);
  animate(0);
});

window.addEventListener('resize', () => {
  renderer.resize();
});