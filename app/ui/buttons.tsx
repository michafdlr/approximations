type CurState = {
  name: string;
  state: string | number | object | boolean;
  func: (value: any) => void;
};

export function AcceptButton({disabled, step, intervals, curStates} : {disabled: boolean, step: number, intervals: { [key: number]: { left: string, right: string } }, curStates: Array<CurState>}) {
  return (
    <button
    disabled={disabled}
    className="w-36 bg-white-600 shadow-white-400 shadow border-gray-600 border-2 text-black rounded-md hover:bg-green-300 hover:scale-105 active:translate-x-1 active:translate-y-1 duration-150 disabled:bg-gray-800 disabled:scale-100 disabled:translate-x-0 disabled:translate-y-0"
    onClick={() => {
      curStates.map(({name, state, func}) => {
        if (name === "radDisabled") {
          func(true);
        } else if (name === "precisionDisabled") {
          func(true);
        } else if (name === 'left') {
          func(intervals[step].left);
        } else if (name === 'right') {
          func(intervals[step].right);
        } else if (name === 'acceptDisabled') {
          func(true);
        }
      })
    }
    }
    >
      Akzeptieren
    </button>
  )
}

export function StepButton({disabled, step, intervals, curStates, len} : {disabled: boolean, step: number, intervals: { [key: number]: { left: string, right: string } }, curStates: Array<CurState>, len: number}) {
  return (
    <button
    disabled={disabled}
    className="w-36 bg-white-600 shadow-white-400 shadow border-gray-600 border-2 text-black rounded-md hover:bg-green-300 hover:scale-105 active:translate-x-1 active:translate-y-1 duration-150 disabled:bg-gray-800 disabled:scale-100 disabled:translate-x-0 disabled:translate-y-0"
    onClick={() => {
      if (step<len) {
        curStates.filter(({name, state, func}) => {
          if (name === 'step') {
            func(Number(state)+1);
            step++;
          }
        })
      } else {
        alert('Gewünschte Genauigkeit erreicht. Ändere die Genauigkeit, um den Wert noch genauer zu berechnen.')
      }
      curStates.map(({name, state, func}) => {
        if (name === 'left') {
          func(intervals[step].left);
        } else if (name === 'right') {
          func(intervals[step].right);
        }
      })
    }}
    >
      Nächster Schritt
    </button>
  )
}

export function ResetButton({curStates} : {curStates: Array<CurState>}) {
  return (
    <button
    className="w-36 bg-white-600 shadow-white-400 shadow border-gray-600 border-2 text-black rounded-md hover:bg-green-300 hover:scale-105 active:translate-x-1 active:translate-y-1 duration-150"
    onClick={() => {
      resetStates(curStates);
    }
    }
    >
      Zurücksetzen
    </button>
  )
}

const resetStates = (curStates: Array<CurState>) => {
  curStates.map(({name, state, func}) => {
    if (name === 'step') {
      func(1);
    } else if (name === 'intervals') {
      func({});
    } else if (name === 'start') {
      func('1');
    } else if (name === "radDisabled" || name === 'acceptDisabled' || name === 'precisionDisabled') {
      func(false);
    } else {
      func('');
    }
  })
}

export const calculateBoundaries = (radikand: string, precision: number) => {
  let rad = Number(radikand);
  const sqrt = Math.sqrt(rad);
  let left = Math.floor(sqrt);
  if (left === sqrt) {
    return {1: {left: left, right: left}};
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

export const calculateBoundariesHeron = (radikand: string, precision: number, start: number) => {
  let rad = Number(radikand);
  const sqrt = Math.sqrt(rad);
  let left, right;
  if (rad/start>start) {
    right = rad/start;
    left = start
  } else {
    left = rad/start;
    right = start;
  }
  if (start === sqrt) {
    return {1: {left: left, right: left}}
  }
  let intervals: { [key: number]: object } = {1: {left, right}};
  let counter = 2;
  while (Math.floor(right*10**precision) !== Math.floor(left*10**precision)) {
    let a: number = (left + right)/2;
    let b = rad/a;
    if (a > b) {
      left = b;
      right = a;
    } else {
      left = a;
      right = b;
    }
    intervals[counter] = {
      left,
      right
    };
    counter++;
  }
  return intervals
}
