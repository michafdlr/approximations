export function drawNumberLine(ctx: CanvasRenderingContext2D) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = 'rgb(255,255,255)';
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(5, height/2);
  ctx.lineTo(width-20, height/2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width-20, height/2-15);
  ctx.lineTo(width-20, height/2+15);
  ctx.lineTo(width, height/2);
  ctx.lineTo(width-20, height/2-15);
  ctx.closePath();
  ctx.fill();
}


export function drawTick (ctx: CanvasRenderingContext2D, x: number, color: string) {
  const height = ctx.canvas.height;
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(50*x+10, height/2-15);
  ctx.lineTo(50*x+10, height/2+15);
  ctx.stroke();
  ctx.font = "bold 24px lusitana";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(String(x), 50*x+10, height/2+15);
}

export function drawRoot (ctx: CanvasRenderingContext2D, x: number) {
  const height = ctx.canvas.height;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.beginPath();
  ctx.moveTo(50*x+10,height/2-15);
  ctx.lineTo(50*x+10,height/2+15);
  ctx.stroke();
}
