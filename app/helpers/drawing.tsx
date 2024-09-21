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

export function drawRectangle (ctx: CanvasRenderingContext2D, length: number, width: number, radikand: string, colorLength: string, colorWidth: string) {
  const canvWidth = ctx.canvas.width;
  const canvHeight = ctx.canvas.height;
  const scale = Math.min(canvWidth/width, canvHeight/length);
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.clearRect(0, 0, canvWidth, canvHeight);
  ctx.fillStyle = "rgb(255 255 255 / 50%)";
  ctx.fillRect(3, 3, scale*width-8, scale*length-8);
  ctx.fill();
  ctx.strokeStyle = colorWidth;
  ctx.beginPath();
  ctx.moveTo(3,3);
  ctx.lineTo(scale*width-6, 3);
  ctx.moveTo(3,scale*length-6);
  ctx.lineTo(scale*width-6,scale*length-6);
  ctx.stroke();
  ctx.strokeStyle = colorLength;
  ctx.beginPath();
  ctx.moveTo(3,3);
  ctx.lineTo(3, scale*length-6);
  ctx.moveTo(scale*width-6, 3);
  ctx.lineTo(scale*width-6,scale*length-6);
  ctx.stroke();
  ctx.font = "bold 30px lusitana";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "red";
  ctx.fillText(radikand, scale*width/2, scale*length/2);
}
