'use client';

import { useState, useEffect } from 'react';
import InputField from "../ui/inputs";
import Canvas from "../ui/visuals";
import { drawTick, drawNumberLine } from '../helpers/drawing';
import { calculateBoundaries, StepButton, ResetButton, AcceptButton } from "../ui/buttons";

type CurState = {
  name: string;
  state: string | number | object | boolean;
  func: (value: any) => void;
};

export default function Intervallhalbierungsverfahren() {
  const [radikand, setRadikand] = useState('');
  const [precision, setPrecision] = useState('');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [step, setStep] = useState(1);
  const [radDisabled, setRadDisabled] = useState(false);
  const [precisionDisabled, setPrecisionDisabled] = useState(false);
  const [acceptDisabled, setAcceptDisabled] = useState(false);
  const [intervals, setIntervals] = useState({});
  let curStates: CurState[] = [
    {
      name: 'left',
      state: left,
      func: setLeft
    },
    {
      name: 'right',
      state: right,
      func: setRight
    },
    {
      name: 'rad',
      state: radikand,
      func: setRadikand
    },
    {
      name: 'precision',
      state: precision,
      func: setPrecision
    },
    {
      name: 'step',
      state: step,
      func: setStep
    },
    {
      name: 'intervals',
      state: intervals,
      func: setIntervals
    },
    {
      name: 'radDisabled',
      state: radDisabled,
      func: setRadDisabled
    },
    {
      name: 'precisionDisabled',
      state: precisionDisabled,
      func: setPrecisionDisabled
    },
    {
      name: 'acceptDisabled',
      state: acceptDisabled,
      func: setAcceptDisabled
    },
  ]

  const colorRad = 'rgb(255,0,0)';
  const colorLeft = 'rgb(255,190,80)';
  const colorRight = 'rgb(10,150,255)';
  const colorLine = 'rgb(255,255,255)';

  useEffect(() => {
    setIntervals(
      calculateBoundaries(radikand, Number(precision))
    );
  }, [radikand, precision])

  let draw = (ctx: CanvasRenderingContext2D) => {
    const le = Number(left);
    const ri = Number(right);
    const ra = Number (radikand);
    const start = le-2/(2**(step-1))
    drawNumberLine(ctx, colorLine);
    for (let i=0; i<10; i++) {
      drawTick(ctx, start, i/(2**(step-1)), colorLine, step, true);
    }
    if (radikand) {
      drawTick(ctx, start, Math.sqrt(ra)-start, colorRad ,step, false);
    }
    if (left) {
      drawTick(ctx, start, le-start, colorLeft, step, true);
    }
    if (right) {
      drawTick(ctx, start, ri-start, colorRight, step, true);
    }
  }


  return (
      <div className="flex min-h-screen flex-col p-2">
        <h1 className="font-bold text-xl text-center underline mb-14">Intervallhalbierungsverfahren</h1>
        <p className="mb-10">Hier kommt eine Erklärung.</p>
        <h2 className="font-bold text-lg text-center mb-14 italic">Schritt {step}</h2>
        <div className="flex flex-col gap-2 mb-20">
          <InputField id="sqrt" name="Radikand" setState={setRadikand} curState={radikand} color="red" disabled={radDisabled}/>
          <InputField id="precision" name="Genauigkeit" setState={setPrecision} curState={precision} color='black' disabled={precisionDisabled}/>
        </div>
        <div className='flex flex-row gap-2'>
          <AcceptButton disabled={(radikand === '' || precision === '') || acceptDisabled} step={step} intervals={intervals} curStates={curStates}/>

          <StepButton disabled={(radikand === '' || precision === '') || !acceptDisabled} step={step} intervals={intervals} curStates={curStates} len={Object.keys(intervals).length}/>

          <ResetButton curStates={curStates} />
        </div>
        <div className='flex justify-center'>
          <Canvas hidden={radikand !== '' && left !== ''} draw={draw}/>
        </div>
      </div>
  );
}
