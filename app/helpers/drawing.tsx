export function drawNumberLine(ctx: CanvasRenderingContext2D, color: string) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, height/2);
  ctx.lineTo(width-10, height/2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width-10, height/2-10);
  ctx.lineTo(width-10, height/2+10);
  ctx.lineTo(width, height/2);
  ctx.lineTo(width-10, height/2-10);
  ctx.closePath();
  ctx.fill();
}


export function drawTick (ctx: CanvasRenderingContext2D, start: number, i: number, color: string, step: number, visible: boolean=false) {
  const height = ctx.canvas.height;
  const width = ctx.canvas.width;
  const x = width*0.05;
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x+width/10*i*2**(step-1), height/2-10);
  ctx.lineTo(x+width/10*i*2**(step-1), height/2+10);
  ctx.stroke();
  if (visible) {
    ctx.font = "bold 16px lusitana";
    ctx.textAlign = "start";
    ctx.textBaseline = "middle";
    ctx.translate(x+width/10*i*2**(step-1), height/2+15);
    ctx.rotate(Math.PI/2);
    ctx.fillText(String(start + i), 0, 0);
    ctx.rotate(-Math.PI/2);
    ctx.translate(-(x+width/10*i*2**(step-1)), -(height/2+15));
  }

}
