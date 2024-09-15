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
  const width = '500px';

  return <canvas width={width} height={'200px'} style={{width: width, height: '200px'}} className="ml-10" ref={canvasRef} hidden={rest.hidden}/>
}
