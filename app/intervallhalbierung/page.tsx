'use client';

import { useState, useEffect } from 'react';
import InputField from "../ui/inputs";
import Canvas from "../ui/visuals";
import { drawTick, drawNumberLine, drawRoot } from '../helpers/drawing';

export default function Intervallhalbierungsverfahren() {
  const [radikand, setRadikand] = useState('');
  const [precision, setPrecision] = useState('');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [step, setStep] = useState(1);
  // const [leftDisabled, setLeftDisabled] = useState(true);
  // const [rightDisabled, setRightDisabled] = useState(true);
  // const [radDisabled, setRadDisabled] = useState(false);
  const [intervals, setIntervals] = useState({});
  let curStates = [
    {
      name: 'left',
      state: left,
      func: setLeft
    },
    {
      name: 'right',
      state: right,
      func: setRight
    }
  ]

  const colorLeft = 'rgb(255,190,80)';
  const colorRight = 'rgb(10,150,255)';

  useEffect(() => {
    setIntervals(
      calculateBoundaries(radikand, Number(precision))
    )
    console.log(`radikand: ${radikand}, intervals ${intervals}`)
  }, [radikand, precision])

  let draw = (ctx: CanvasRenderingContext2D) => {
    drawNumberLine(ctx);
    for (let i=0; i<ctx.canvas.width/50; i++) {
      drawTick(ctx, i, 'rgb(255,255,255)');
    }
    if (radikand) {
      drawRoot(ctx, Math.sqrt(Number(radikand)));
    }
    if (left) {
      drawTick(ctx, Number(left), colorLeft);
    }
    if (right) {
      drawTick(ctx, Number(right), colorRight);
    }
  }

  return (
      <div className="flex min-h-screen flex-col p-2">
        <h1 className="font-bold text-xl text-center underline mb-14">Intervallhalbierungsverfahren</h1>
        <p className="mb-10">Hier kommt eine Erklärung.</p>
        <h2 className="font-bold text-lg text-center mb-14 italic">Schritt {step}</h2>
        <div className="flex flex-col gap-2 mb-20">
          <InputField id="sqrt" name="Radikand" setState={setRadikand} curState={radikand} color="red" disabled={false}/>
          <InputField id="precision" name="Genauigkeit" setState={setPrecision} curState={precision} color='black' disabled={false}/>
          {/* <InputField id="left" name="Linke Grenze" setState={setLeft} curState={left} color={colorLeft} disabled={leftDisabled}/>
          <InputField id="right" name="Rechte Grenze" setState={setRight} curState={right} color={colorRight} disabled={rightDisabled}/> */}
        </div>
        <div className='flex flex-row gap-2'>
          {/* <RadikandButton disabled={radDisabled} radikand={radikand} curStates={curStates}/> */}

          <BoundariesButton disabled={radikand === '' || precision === ''} step={step} intervals={intervals} curStates={curStates}/>

          <StepButton disabled={radikand === '' || precision === ''} step={step} setStep={setStep}/>
        </div>
        <div className='flex justify-center'>
          <Canvas hidden={radikand !== ''} draw={draw}/>
        </div>
      </div>
  );
}

type CurState = {
  name: string;
  state: string;
  func: (value: string) => void;
};

// function RadikandButton({disabled, radikand, curStates} : {disabled: boolean, radikand: string, curStates: Array<CurState>}) {
//   return (
//     <button
//     disabled={disabled}
//     className="w-36 bg-white-600 shadow-white-400 shadow border-gray-600 border-2 text-black rounded-md hover:bg-green-300 hover:scale-105 active:translate-x-1 active:translate-y-1 duration-150 disabled:bg-gray-800 disabled:scale-100 disabled:translate-x-0 disabled:translate-y-0"
//     onClick={() => {
//       if (radikand) {
//         curStates.map(({state, func}) => {
//           func(!state)
//         });
//       } else {
//         alert('Du musst für Radikand eine Zahl zwischen 1 und 8 eintragen.')
//       }
//     }}
//     >
//       Radikand akzeptieren
//     </button>
//   )
// }

function BoundariesButton({disabled, step, intervals, curStates} : {disabled: boolean, step: number, intervals: { [key: number]: { left: string, right: string } }, curStates: Array<CurState>}) {
  return (
    <button
    disabled={disabled}
    className="w-36 bg-white-600 shadow-white-400 shadow border-gray-600 border-2 text-black rounded-md hover:bg-green-300 hover:scale-105 active:translate-x-1 active:translate-y-1 duration-150 disabled:bg-gray-800 disabled:scale-100 disabled:translate-x-0 disabled:translate-y-0"
    onClick={() => {
      curStates.map(({name, state, func}) => {
        if (name === 'left') {
          func(intervals[step].left)
        } else {
          func(intervals[step].right)
        }
      })
      console.log(intervals[step]);
      console.log(intervals);
    }
    }
    >
      Grenzen zeigen
    </button>
  )
}

function StepButton({disabled, step, setStep} : {disabled: boolean, step: number, setStep: any}) {
  return (
    <button
    disabled={disabled}
    className="w-36 bg-white-600 shadow-white-400 shadow border-gray-600 border-2 text-black rounded-md hover:bg-green-300 hover:scale-105 active:translate-x-1 active:translate-y-1 duration-150 disabled:bg-gray-800 disabled:scale-100 disabled:translate-x-0 disabled:translate-y-0"
    onClick={() => {
      setStep(step+1)
    }
    }
    >
      Nächster Schritt
    </button>
  )
}

const calculateBoundaries = (radikand: string, precision: number) => {
  const rad = Number(radikand);
  const sqrt = Math.sqrt(Number(radikand));
  let left = Math.floor(sqrt);
  if (left === sqrt) {
    return {1: [left, left]}
  }
  let right = left+1;
  let intervals: { [key: number]: object } = {1: {left, right}};
  let counter = 2;
  while (Math.floor(right*10**precision) !== Math.floor(left*10**precision)) {
    const mid = (left + right)/2;
    if (mid**2>rad) {
      right = mid;
    } else if (mid**2===rad) {
      left = mid;
      right = mid;
    } else {
      left = mid;
    }
    intervals[counter] = {
      left,
      right
    };
    counter++;
  }
  return intervals
}
