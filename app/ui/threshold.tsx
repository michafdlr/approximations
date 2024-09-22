import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export function Threshold ({hidden, intervals, radikand, step, colorLeft, colorRight} : {hidden: boolean, radikand: string, step: number,  colorLeft: string, colorRight: string ,intervals: { [key: number]: { left: string, right: string } }}) {
  if (!hidden) {
    const leftBound = intervals[step].left;
    const leftBoundNum = Number(leftBound);
    const rightBound = intervals[step].right;
    const rightBoundNum = Number(rightBound);
    return (
      <>
        <p className="mb-8 text-justify">
          Da <Latex>${leftBound}^2={(leftBoundNum**2).toString()}\le {radikand}$</Latex> gilt, ist die linke Grenze <strong style={{ color: colorLeft }}>{leftBound}</strong>.
        </p>
        <p className="mb-8 text-justify">
          Da  <Latex>${rightBound}^2={(rightBoundNum**2).toString()}\ge {radikand}$</Latex> gilt, ist die rechte Grenze <strong style={{ color: colorRight }}>{rightBound}</strong>.
        </p>
      </>
    )
  }
}

export function ThresholdHeron ({hidden, intervals, radikand, step, colorLeft, colorRight} : {hidden: boolean, radikand: string, step: number,  colorLeft: string, colorRight: string ,intervals: { [key: number]: { left: string, right: string } }}) {
  if (!hidden) {
    const leftBound = intervals[step].left;
    const rightBound = intervals[step].right;
    const n = step.toString();
    if (step === 1) {
      return (
        <>
          <p className="mb-8 text-justify">
            Seite <Latex>$a_1$</Latex> hat eine Länge von <strong style={{ color: colorLeft }}>{leftBound}</strong> LE.
          </p>
          <p className="mb-8 text-justify">
            Seite <Latex>{`$b_1=\\frac{${radikand}}{${leftBound}}$`}</Latex> hat eine Länge von <strong style={{ color: colorRight }}>{rightBound}</strong>.
          </p>
        </>
      )
    }
    const leftBoundLast = intervals[step-1].left;
    const rightBoundLast = intervals[step-1].right;
    const last = (step-1).toString();
    return (
      <>
        <p className="mb-8 text-justify">
          Seite <Latex>{`$a_{${n}}=\\frac{a_{${last}}+b_{${last}}}{2}=\\frac{${leftBoundLast}+${rightBoundLast}}{2}$`}</Latex> hat eine Länge von <strong style={{ color: colorLeft }}>{leftBound}</strong> LE.
        </p>
        <p className="mb-8 text-justify">
          Seite <Latex>{`$b_{${n}}=\\frac{${radikand}}{${leftBound}}$`}</Latex> hat eine Länge von <strong style={{ color: colorRight }}>{rightBound}</strong> LE.
        </p>
      </>
    )
  }
}
