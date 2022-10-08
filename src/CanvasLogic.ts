import  { Application, Graphics  } from 'pixi.js'



export class CanvasLogic {
  canvas: HTMLCanvasElement

  app: Application

  constructor(htmlCanvas: HTMLCanvasElement) {
    this.canvas = htmlCanvas

    this.app = new Application({
      view: this.canvas,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0xfcf8f7,
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  addGraphic(graphic: Graphics) {
    this.app.stage.addChild(graphic)
  }

  getApp() {
    return this.app
  }
}