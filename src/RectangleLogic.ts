import {  Graphics, InteractionEvent, DisplayObject, Point, InteractionData, Application } from 'pixi.js'

type DragObject = DisplayObject & {
  dragData: InteractionData
  dragging: number
  dragPointerStart: DisplayObject
  dragObjStart: Point
  dragGlobalStart: Point
}

type FillProps = {
  color?: number | undefined,
  alpha?: number | undefined
}

type DrawProps = {
  x: number,
  y: number,
  width: number,
  height: number
}

export class RectangleLogic {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  buildRectangle(
    fillProps: FillProps,
    drawProps: DrawProps
  ) {
    const rectangle = new Graphics()
    rectangle.beginFill(fillProps.color, fillProps.alpha);
    rectangle.drawRect(drawProps.x, drawProps.y, drawProps.width, drawProps.height);
    
    return rectangle
  }

  makeDraggable(
    graphic: Graphics
  ) {
    graphic.interactive = true
    graphic.buttonMode = true

    graphic
      .on('pointerdown', this.onDragStart(this.app))
      .on('pointerup', this.onDragEnd(this.app))
      .on('pointerupoutside', this.onDragEnd(this.app))
      .on('pointermove', this.onDragMove(this.app))
  }

  removeDraggable(
    graphic: Graphics
  ) {
    graphic.interactive = false
    graphic.buttonMode = false

    graphic
      .removeListener('pointerdown', this.onDragStart(this.app))
      .removeListener('pointerup', this.onDragEnd(this.app))
      .removeListener('pointerupoutside', this.onDragEnd(this.app))
      .removeListener('pointermove', this.onDragMove(this.app))
  }

  onDragStart(app: Application) {
    return function(event: InteractionEvent) {
      const obj = event.currentTarget as DragObject

      obj.dragData = event.data
      obj.dragging = 1
      obj.dragPointerStart = event.data.getLocalPosition(obj.parent)
      obj.dragObjStart = new Point()
      obj.dragObjStart.copyFrom(obj.position)
      obj.dragGlobalStart = new Point()
      obj.dragGlobalStart.copyFrom(event.data.global)
    }
  }

  onDragEnd(app: Application) {
    return function(event: InteractionEvent) {
      const obj = event.currentTarget as DragObject
    
      if (!obj.dragging) {
        return
      }
  
      obj.position.x = Math.min(Math.max(obj.position.x, 0), app.screen.width)
      obj.position.y = Math.min(Math.max(obj.position.y, 0), app.screen.height)
    
      obj.dragging = 0
    }
  }

  onDragMove(app: Application) {
    return function(event: InteractionEvent) {
      const obj = event.currentTarget as DragObject

      if (!obj.dragging) {
        return
      }
  
      const data = obj.dragData
  
      if (obj.dragging === 1) {
        if (
          Math.abs(data.global.x - obj.dragGlobalStart.x) +
            Math.abs(data.global.y - obj.dragGlobalStart.y) >=
          3
        ) {
          obj.dragging = 2
        }
      }
  
      if (obj.dragging === 2) {
        const dragPointerEnd = data.getLocalPosition(obj.parent)
        obj.position.set(
          obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
          obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
        )
      }
    }
  }
}