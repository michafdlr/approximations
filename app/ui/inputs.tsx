'use client';

import { useState } from "react";

export default function InputField ({ id, name, setState, curState }: { id: string, name: string, setState: any, curState: string }) {
  return (
    <div className="flex flex-row">
      <label htmlFor={id} className="w-32">{name}: </label>
      <input
      className="rounded-md w-14 text-black border-solid border-gray-500 border-2"
      type="number"
      id={id}
      min={1}
      max={100}
      value={curState}
      onChange={(e) => {
          if (e.target.value === "") {
            setState('');
          } else if (Number(e.target.value)<1) {
            setState('1');
          } else if (Number(e.target.value)>100) {
            setState('100');
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
