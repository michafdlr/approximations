'use client';

import { useState, useEffect } from 'react';
import InputField from "../ui/inputs";
import Canvas from "../ui/visuals";
import { drawTick, drawNumberLine, drawRoot } from '../helpers/drawing';

export default function Intervallhalbierungsverfahren() {
  const [radikand, setRadikand] = useState('');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  useEffect(() => {
    console.log(`radikand: ${radikand}, left: ${left}, right: ${right}`)
  }, [radikand, left, right])

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawNumberLine(ctx);
    if (radikand && left && right) {
      drawRoot(ctx, Math.sqrt(Number(radikand)));
      drawTick(ctx, Number(left));
      drawTick(ctx, Number(right));
    }
    for (let i=0; i<ctx.canvas.width/50; i++) {
      drawTick(ctx, i);
    }
  }

  return (
      <div className="flex min-h-screen flex-col p-2">
        <h1 className="font-bold text-xl text-center underline mb-14">Intervallhalbierungsverfahren</h1>
        <p className="mb-10">Hier kommt eine Erklärung.</p>
        <div className="flex flex-col gap-2 mb-20">
          <InputField id="sqrt" name="Radikand" setState={setRadikand} curState={radikand}/>
          <InputField id="left" name="Linke Grenze" setState={setLeft} curState={left}/>
          <InputField id="right" name="Rechte Grenze" setState={setRight} curState={right}/>
        </div>
        <Canvas draw={draw}/>
      </div>
  );
}
