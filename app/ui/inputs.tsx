'use client';

import { useState } from "react";

export default function InputField ({ id, name, setState, curState, color, disabled }: { id: string, name: string, setState: any, curState: string, color: string, disabled: boolean }) {
  return (
    <div className="flex flex-row">
      <label htmlFor={id} className="w-32">{name}: </label>
      <input
      className="rounded-md w-14 text-black border-solid border-gray-500 border-2"
      type="number"
      id={id}
      style={{color: color}}
      // hidden={disabled}
      disabled={disabled}
      min={0}
      value={curState}
      onChange={(e) => {
          if (e.target.value === "") {
            setState('');
          } else {
            setState(e.target.value);
          }
        }
      }
      />
      {/* <button
      onClick={() => console.log(value)}
      className="bg-white-600 text-black"
      >Show input
      </button> */}
    </div>
  )
}
