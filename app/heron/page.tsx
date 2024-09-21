'use client';

import { useState, useEffect } from 'react';
import InputField from "../ui/inputs";
import Canvas from "../ui/visuals";
import { drawRectangle } from '../helpers/drawing';
import { calculateBoundariesHeron, StepButton, ResetButton, AcceptButton } from "../ui/buttons";
import Table from '../ui/table';
import Threshold from '../ui/threshold';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

type CurState = {
  name: string;
  state: string | number | object | boolean;
  func: (value: any) => void;
};

export default function HeronVerfahren() {
  const [radikand, setRadikand] = useState('');
  const [precision, setPrecision] = useState('');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [step, setStep] = useState(1);
  const [start, setStart] = useState('1');
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
      name: 'start',
      state: start,
      func: setStart,
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

  const colorLeft = 'rgb(255,190,80)';
  const colorRight = 'rgb(10,150,255)';

  useEffect(() => {
    if (Number(radikand) >= 0 && start !== '' && Number(start)>0) {
      setIntervals(
        calculateBoundariesHeron(radikand, Math.min(Math.floor(Number(precision)), 10), Number(start))
      );
    } else {
      alert('Radikand muss positiv oder 0 sein und Genauigkeit eine ganze Zahl größer als 0!');
      setRadikand('');
    }
    if (precision !== '' && Number(precision) > 10) {
      setPrecision('10');
    } else if (precision !== '' && Number(precision) <= 0) {
      setPrecision('1');
    } else if (precision !== '' && Math.floor(Number(precision)) !== Number(precision)) {
      setPrecision(Math.floor(Number(precision)).toString());
    }
  }, [radikand, precision])

  useEffect(()=>{
    if (start !== '' && Number(start)<=0) {
      setStart('1');
    }
  }, [start])

  let draw = (ctx: CanvasRenderingContext2D) => {
    const le = Number(left);
    const ri = Number(right);
    drawRectangle(ctx, le, ri, radikand, colorLeft, colorRight);
  }


  return (
      <div className="flex min-h-screen flex-col p-2">
        <h1 className="font-bold text-xl text-center underline mb-8">Heronverfahren</h1>
        <h2 className="font-bold text-lg text-center mb-6">Erklärung des Verfahrens</h2>
        <p className="mb-2 text-justify">
          Beim Intervallhalbierungsverfahren handelt es sich um ein Näherungsverfahren zur Berechnung von Quadratwurzeln. Die Idee des Verfahrens ist es, durch das Halbieren eines Intervalls, in dem der Wert der Wurzel liegt, den Wert immer genauer anzunähern. Zu Beginn müssen dabei zwei aufeinanderfolgende natürliche Zahlen bestimmt werden, zwischen denen der Wert der Wurzel liegt. Dies gelingt durch "Probieren". Die linke Grenze dieses ersten Intervalls findet man, indem man die größte natürliche Zahl bestimmt, deren Quadrat kleiner als der Radikand ist. Die rechte Grenze ist dann die kleinste natürliche Zahl, deren Quadrat größer als der Radikand ist.
        </p>
        <p className="mb-2 text-justify">
          <Latex>Betrachten wir als Beispiel $\sqrt2$. Der Radikand ist 2. Im ersten Schritt des Intervallhalbierungsverfahrens suchen wir als linke Grenze die größte natürliche Zahl, deren Quadrat kleiner als oder genau der Radikand (hier: 2) ist. Die rechte Grenze ist entsprechend die linke Grenze plus 1. Die linke Grenze in diesem Beispiel ist 1, denn $1^2=1\le2$ und die rechte Grenze 2, denn $2^2=4\ge 2$. Damit haben wir das erste Intervall $[1; 2]$ gefunden.</Latex>
        </p>
        <p className="mb-8 text-justify">
          Für den nächsten Schritt halbieren wir das vorher gefundene Intervall <Latex>$[1; 2]$</Latex> in der Mitte und erhalten als Intervallmitte <Latex>{"$\\frac{1+2}{2}=1,5$"}</Latex>. Da <Latex>$1,5^2=2,25\ge2$</Latex> ist, ändert sich die rechte Grenze von 2 auf 1,5. D.h. das Intervall nach dem zweiten Schritt ist <Latex>$[1; 1,5]$</Latex>. Wie zu erkennen ist, hat sich die Länge des Intervalls halbiert, daher der Name Intervallhalbierungsverfahren.Analog fährt man in den folgenden Schritten fort, bis man die gewünschte Genauigkeit erreicht hat.
        </p>
        <h2 className="font-bold text-lg text-center mb-6">Nutzung des Programms</h2>
        <p className="mb-10 text-justify">
          Wähle im Feld "Radikand" den nicht negativen Wert, von dem die Wurzel berechnet werden soll. Stelle anschließend die Genauigkeit ein, indem du eine positive ganze Zahl eingibst. Die Genauigkeit gibt dabei an, auf wie viele Nachkommastellen genau die Wurzel berechnet werden soll. Die maximale Genauigkeit ist auf 10 Nachkommastellen beschränkt. Klicke dann auf den "Akzeptieren" Button. Wenn du auf den "Nächster Schritt" Button klickst, wird ein Intervallhalbierungsschritt vollzogen. Du siehst dies an der Zahlengeraden und in der Tabelle, in der die jeweiligen Grenzen angezeigt werden. Um den Radikanden oder die Genauigkeit zu ändern, klicke den "Zurücksetzen" Button.
        </p>
        <h2 className="font-bold text-lg text-center mb-14 italic">Schritt {step}</h2>
        <div className="flex flex-col gap-2 mb-20">
          <InputField id="sqrt" name="Radikand" setState={setRadikand} curState={radikand} color="red" disabled={radDisabled}/>
          <InputField id="precision" name="Genauigkeit" setState={setPrecision} curState={precision} color='black' disabled={precisionDisabled}/>
          <InputField id="start" name="Startwert" setState={setStart} curState={start} color='black' disabled={precisionDisabled}/>
        </div>
        <div className='flex flex-row gap-2'>
          <AcceptButton disabled={(radikand === '' || precision === '') || acceptDisabled} step={step} intervals={intervals} curStates={curStates}/>

          <StepButton disabled={(radikand === '' || precision === '') || !acceptDisabled} step={step} intervals={intervals} curStates={curStates} len={Object.keys(intervals).length}/>

          <ResetButton curStates={curStates}/>
        </div>
        <div className='flex flex-col mt-10'>
          <Threshold hidden={radikand === ''} intervals={intervals} radikand={radikand} step={step} colorLeft={colorLeft} colorRight={colorRight}/>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Canvas hidden={radikand === '' || left === '' || left === right} draw={draw}/>
          <Table data={intervals} step={step}/>
        </div>
      </div>
  );
}
