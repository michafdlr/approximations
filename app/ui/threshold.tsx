import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function Threshold ({hidden, intervals, radikand, step, colorLeft, colorRight} : {hidden: boolean, radikand: string, step: number,  colorLeft: string, colorRight: string ,intervals: { [key: number]: { left: string, right: string } }}) {
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
