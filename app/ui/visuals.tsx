'use client';

import { useRef, useEffect } from 'react'

export default function Canvas(props: any) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { draw, ...rest } = props;

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    draw(context)
  }, [draw])

  return <canvas width={'500px'} height={'100px'} style={{width: '500px', height: '100px'}} className="ml-10" ref={canvasRef} hidden={!rest.hidden}/>
}
