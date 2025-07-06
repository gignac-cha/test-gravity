import { Vector2 } from './vector2.ts';

export class CelestialBody {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  mass: number;
  radius: number;
  color: string;

  constructor(x: number, y: number, mass: number, radius: number, color: string) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.mass = mass;
    this.radius = radius;
    this.color = color;
  }

  applyForce(force: Vector2): void {
    this.acceleration = this.acceleration.add(force.multiply(1 / this.mass));
  }

  update(deltaTime: number): void {
    this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
    this.position = this.position.add(this.velocity.multiply(deltaTime));
    this.acceleration = new Vector2(0, 0);
  }
}