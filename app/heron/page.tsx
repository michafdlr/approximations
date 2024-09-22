'use client';

import { useState, useEffect } from 'react';
import InputField from "../ui/inputs";
import Canvas from "../ui/visuals";
import { drawRectangle } from '../helpers/drawing';
import { calculateBoundariesHeron, StepButton, ResetButton, AcceptButton } from "../ui/buttons";
import Table from '../ui/table';
import { ThresholdHeron } from '../ui/threshold';
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
    } else if (start !== '') {
      setStart(start);
      setIntervals(
        calculateBoundariesHeron(radikand, Math.min(Math.floor(Number(precision)), 10), Number(start))
      );
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
          Beim Heronverfahren handelt es sich um ein rekursives Näherungsverfahren zur Berechnung von Quadratwurzeln. Die geometrische Idee des Verfahrens ist es, aus einem Rechteck mit Flächeninhalt gleich dem Radikanden schrittweise näherungsweise in ein Quadrat umzuwandeln, dessen Flächeninhalt noch immer dem Radikanden entspricht. Die Seitenlängen entsprechen dann nämlich näherungsweise dem Wert des Wurzelterms. Zu Beginn legt man zunächst einen positiven Startwert fest, der einen Näherungswert für den Wert des Wurzelterms darstellt und einer Kantenlänge des Rechtecks entspricht. Die andere Kantenlänge ist entsprechend der Radikand dividiert durch den Startwert. Im nächsten Schritt wird nun der Mittelwert der beiden Seitenlängen gebildet und als eine neue Seitenlänge des Rechtecks verwendet. Die andere Seite entspricht wieder dem Quotienten aus Radikand und neuer Seitenlänge.
        </p>
        <p className="mb-2 text-justify">
          <Latex>Betrachten wir als Beispiel $\sqrt2$. Der Radikand ist 2. Nehmen wir an, als Startwert wird $a_1=1$ gewählt.</Latex> Die zweite Seite ist dann <Latex>{"$b_1=\\frac{2}{a_1}=\\frac{2}{1}=2$"}</Latex>.
        </p>
        <p className="mb-8 text-justify">
          Im zweiten Schritt wird als neue Seite <Latex>{"$a_2=\\frac{a_1+b_1}{2}=\\frac{1+2}{2}=\\frac32=1,5$"}</Latex> gebildet. Die zweite Seite ist dann <Latex>{"$b_2=\\frac{2}{a_2}=\\frac{2}{\\frac32}=\\frac43\\approx1,33$"}</Latex>.
        </p>
        <p className="mb-8 text-justify">
          Im dritten Schritt wird als neue Seite <Latex>{"$a_3=\\frac{a_2+b_2}{2}=\\frac{\\frac32+\\frac43}{2}=\\frac{17}{12}\\approx1,4167$"}</Latex> gebildet. Die zweite Seite ist dann <Latex>{"$b_3=\\frac{2}{a_3}=\\frac{2}{\\frac{17}{12}}=\\frac{24}{17}\\approx1,412$"}</Latex>. Und so weiter.
        </p>
        <p className="mb-8 text-justify">
          Man sieht im Vergleich zum Intervallhalbierungsverfahren eine deutlich schneller Konvergenz gegen den exakten Wert. Bereits nach zwei Schritten sind die ersten zwei Nachkommastellen korrekt.
        </p>
        <h2 className="font-bold text-lg text-center mb-6">Nutzung des Programms</h2>
        <p className="mb-10 text-justify">
          Wähle im Feld "Radikand" den nicht negativen Wert, von dem die Wurzel berechnet werden soll. Stelle anschließend die Genauigkeit ein, indem du eine positive ganze Zahl eingibst. Die Genauigkeit gibt dabei an, auf wie viele Nachkommastellen genau die Wurzel berechnet werden soll. Die maximale Genauigkeit ist auf 10 Nachkommastellen beschränkt. Wähle anschließend einen Startwert größer als 0. Klicke dann auf den "Akzeptieren" Button. Wenn du auf den "Nächster Schritt" Button klickst, wird ein Schritt des Heronverfahrens vollzogen. Du siehst ein Rechteck mit den entsprechenden Seiten und eine Tabelle, in der die jeweiligen Seitenlängen angezeigt werden. Um den Radikanden, Startwert oder die Genauigkeit zu ändern, klicke den "Zurücksetzen" Button.
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
          <ThresholdHeron hidden={radikand === '' || precision === ''} intervals={intervals} radikand={radikand} step={step} colorLeft={colorLeft} colorRight={colorRight}/>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Canvas hidden={radikand === '' || left === '' || left === right} draw={draw}/>
          <Table data={intervals} step={step} hidden={radikand === '' || precision === ''} heron={true}/>
        </div>
      </div>
  );
}
