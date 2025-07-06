export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawRect(x: number, y: number, width: number, height: number, color: string = '#000'): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawCircle(x: number, y: number, radius: number, color: string = '#000', alpha: number = 1, borderColor?: string, borderWidth?: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    // 투명도 설정
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.fill();
    
    // 테두리 그리기
    if (borderColor && borderWidth) {
      this.ctx.globalAlpha = 1;
      this.ctx.strokeStyle = borderColor;
      this.ctx.lineWidth = borderWidth;
      this.ctx.stroke();
    }
    
    // 투명도 복원
    this.ctx.globalAlpha = 1;
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, color: string = '#000', width: number = 1): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  drawText(text: string, x: number, y: number, color: string = '#000', font: string = '16px Arial'): void {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }
}