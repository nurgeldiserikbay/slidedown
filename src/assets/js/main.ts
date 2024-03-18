import { WEBGL, CANVAS, Scale } from 'phaser'

import { GameOpt } from "./Game"

import { type ControlsType } from '@/utils/conts'

export interface IGameConfigOpt {
  width: number
  height: number
  volume: boolean
  controlType: ControlsType
  canvas: HTMLCanvasElement
  gameUpdate: (opt: { score: number }) => void
  gameEnd: () => void
}

export function createGameConfig({ width, height, volume, controlType, canvas, gameUpdate, gameEnd }: IGameConfigOpt) {
  return {
    type: WEBGL,
    canvas: canvas,
    transparent: true,
    powerPreference: 'high-performance',
    scale: {
      mode: Scale.ScaleModes.FIT,
      autoCenter: Scale.CENTER_BOTH,
      width: width,
      height: height,
      backgroundColor: 0xff0000,
    },
    physics: {
      default: 'matter',
      physics: {
        gravity: { y: 10, x: 0 },
        debug: false
      }
    },
    scene: new GameOpt({ controlType, volume, gameUpdate, gameEnd }),
  }
}
