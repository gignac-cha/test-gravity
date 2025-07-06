import { Vector2 } from './vector2.ts';
import { CelestialBody } from './celestial-body.ts';

export class PhysicsEngine {
  private static readonly G = 6.6743015000000000e-11; // 중력 상수 (CODATA 2018)
  private static readonly SCALE = 1; // 스케일 팩터 (실제 물리값 사용)

  static calculateGravitationalForce(body1: CelestialBody, body2: CelestialBody): Vector2 {
    const direction = body2.position.subtract(body1.position);
    const distance = direction.magnitude();
    
    if (distance === 0) return new Vector2(0, 0);
    
    const forceMagnitude = (PhysicsEngine.G * body1.mass * body2.mass) / (distance * distance);
    const forceDirection = direction.normalize();
    
    return forceDirection.multiply(forceMagnitude * PhysicsEngine.SCALE);
  }
}