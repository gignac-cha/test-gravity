import { Vector2 } from './vector2';
import { CelestialBody } from './celestial-body';
import { PhysicsEngine } from './physics-engine';
import { CanvasRenderer } from './canvas-renderer';

export class GravitySimulation {
  private earth: CelestialBody;
  private basketballs: CelestialBody[];
  private renderer: CanvasRenderer;
  private zoom: number;
  private centerX: number;
  private centerY: number;
  private lastTime: number;

  constructor(renderer: CanvasRenderer) {
    this.renderer = renderer;
    this.zoom = 1e-6; // 줌 레벨 설정
    this.centerX = 0;
    this.centerY = 0;
    this.lastTime = performance.now();

    // 지구 (질량: 5.972 × 10²⁴ kg, 반지름: 6.371 × 10⁶ m)
    this.earth = new CelestialBody(0, 0, 5.972e24, 6.371e6, '#4a90e2');
    
    // 농구공들 생성 (5m ~ 15m 높이)
    this.basketballs = [];
    const colors = ['#ff6b35', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#34495e', '#e67e22', '#1abc9c', '#95a5a6', '#d35400'];
    
    for (let i = 5; i <= 15; i++) {
      const xPosition = (i - 10) * 1; // 10m를 중심으로 좌우로 1m씩 배치
      const basketball = new CelestialBody(xPosition, -6.371e6 - i, 0.625, 0.1194, colors[i - 5]);
      basketball.velocity = new Vector2(0, 0);
      this.basketballs.push(basketball);
    }
    
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // 마우스 휠 (줌)
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      const zoomFactor = 1.1;
      if (e.deltaY < 0) {
        // 줌 인
        this.zoom *= zoomFactor;
      } else {
        // 줌 아웃
        this.zoom /= zoomFactor;
      }
      
      // 줌 레벨 제한
      this.zoom = Math.max(1e-10, Math.min(1e10, this.zoom));
    }, { passive: false });

    // 마우스 드래그 (화면 이동)
    this.renderer.context.canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      this.renderer.context.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;

      // 화면 좌표 변화를 월드 좌표로 변환
      this.centerX -= deltaX / this.zoom;
      this.centerY -= deltaY / this.zoom;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      this.renderer.context.canvas.style.cursor = 'grab';
    });

    // 초기 커서 설정
    this.renderer.context.canvas.style.cursor = 'grab';
  }

  private handleCollision(basketball: CelestialBody): void {
    const distance = basketball.position.subtract(this.earth.position).magnitude();
    const minDistance = this.earth.radius + basketball.radius;
    
    if (distance <= minDistance) {
      // 충돌 발생 - 농구공을 지구 표면으로 이동
      const direction = basketball.position.subtract(this.earth.position).normalize();
      basketball.position = this.earth.position.add(direction.multiply(minDistance));
      
      // 탄성 충돌 - 속도 반전 (반발 계수 0.8 적용)
      const restitution = 0.8;
      const normal = direction;
      const velocityDotNormal = basketball.velocity.x * normal.x + basketball.velocity.y * normal.y;
      
      if (velocityDotNormal < 0) {
        // 표면을 향해 움직이고 있을 때만 반발
        basketball.velocity = basketball.velocity.subtract(
          normal.multiply(2 * velocityDotNormal * restitution)
        );
      }
    }
  }

  private worldToScreen(worldPos: Vector2): Vector2 {
    const screenX = (worldPos.x - this.centerX) * this.zoom + this.renderer.width / 2;
    const screenY = (worldPos.y - this.centerY) * this.zoom + this.renderer.height / 2;
    return new Vector2(screenX, screenY);
  }

  private calculateZoom(): void {
    // 초기 줌 레벨만 설정 (마우스 스크롤로 조정 가능)
    if (this.zoom === 1e-6) {
      this.zoom = 10 / this.basketballs[0].radius; // 농구공이 10px로 보이도록 설정
    }
  }

  update(): void {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000 * 1; // 실시간 (1배)
    this.lastTime = currentTime;

    // 모든 농구공에 대해 중력 계산 및 업데이트
    for (const basketball of this.basketballs) {
      // 중력 계산 (농구공이 지구로부터 받는 힘)
      const gravitationalForce = PhysicsEngine.calculateGravitationalForce(basketball, this.earth);
      
      // 농구공에 중력 적용
      basketball.applyForce(gravitationalForce);
      
      // 농구공 업데이트
      basketball.update(deltaTime);
      
      // 충돌 검사 및 처리
      this.handleCollision(basketball);
    }
    
    // 줌 레벨 조정
    this.calculateZoom();
    
    // 초기 카메라 위치만 설정 (농구공들이 보이도록)
    if (this.centerX === 0 && this.centerY === 0) {
      this.centerX = this.basketballs[5].position.x; // 중간 높이 농구공 (10m)
      this.centerY = this.basketballs[5].position.y;
    }
  }

  render(): void {
    this.renderer.clear();
    
    // 지구 렌더링
    const earthScreenPos = this.worldToScreen(this.earth.position);
    const earthScreenRadius = this.earth.radius * this.zoom;
    
    if (earthScreenRadius > 1) {
      this.renderer.drawCircle(earthScreenPos.x, earthScreenPos.y, earthScreenRadius, this.earth.color, 0.7, '#2c5aa0', 3);
    }
    
    // 모든 농구공 렌더링
    for (let i = 0; i < this.basketballs.length; i++) {
      const basketball = this.basketballs[i];
      const basketballScreenPos = this.worldToScreen(basketball.position);
      const basketballScreenRadius = basketball.radius * this.zoom;
      
      this.renderer.drawCircle(basketballScreenPos.x, basketballScreenPos.y, basketballScreenRadius, basketball.color, 0.8, '#333', 1);
    }
    
    // 정보 표시 (첫 번째 농구공 기준)
    const firstBall = this.basketballs[0];
    const distance = firstBall.position.subtract(this.earth.position).magnitude();
    const altitude = distance - this.earth.radius;
    
    this.renderer.drawText(`농구공 개수: ${this.basketballs.length}`, 10, 30, '#000', '16px Arial');
    this.renderer.drawText(`첫 번째 공 고도: ${(altitude * 100).toFixed(1)} cm`, 10, 50, '#000', '16px Arial');
    this.renderer.drawText(`첫 번째 공 속도: ${firstBall.velocity.magnitude().toFixed(1)} m/s`, 10, 70, '#000', '16px Arial');
    this.renderer.drawText(`줌: ${this.zoom.toExponential(2)}`, 10, 90, '#000', '16px Arial');
    
    // 중력 방향 표시
    const gravityForce = PhysicsEngine.calculateGravitationalForce(this.earth, firstBall);
    this.renderer.drawText(`중력 크기: ${gravityForce.magnitude().toExponential(2)} N`, 10, 110, '#000', '16px Arial');
  }
}