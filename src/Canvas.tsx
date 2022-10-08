import React, { useEffect, useRef } from 'react'
import { CanvasLogic } from './CanvasLogic'
import { RectangleLogic } from './RectangleLogic'

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvasLogic = new CanvasLogic(canvasRef.current)
      const rectangleLogic = new RectangleLogic(canvasLogic.getApp())

      const rectangle = rectangleLogic.buildRectangle(
        { color: 0x000000 },
        { width: 100, height: 100, x: 150, y: 150 },
      )
      rectangleLogic.makeDraggable(rectangle)

      canvasLogic.addGraphic(rectangle)

      setTimeout(() => {
        rectangleLogic.removeDraggable(rectangle)
      }, 3000)
    }
  }, [])

  return (
    <canvas ref={canvasRef} />
  )
}