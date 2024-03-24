export type PagesType = 'CONTROLS' | 'SETTINGS' | 'PLAYGROUND'

export const PAGES: { [key in PagesType]: PagesType } = {
  CONTROLS: 'CONTROLS',
  SETTINGS: 'SETTINGS',
  PLAYGROUND: 'PLAYGROUND',
}

export type ControlsType = 'GRAVITY' | 'SWIPE' | 'KEYBOARD'

export const CONTROLS: { [key in ControlsType]: ControlsType } = {
  GRAVITY: 'GRAVITY',
  SWIPE: 'SWIPE',
  KEYBOARD: 'KEYBOARD',
}

export const DEFAULT_USERNAME = 'USERNAME'

export interface IScore {
  best?: {
    name: string
    value: number
  },
  last?: {
    name: string
    value: number
  }
}

export const MAX_FORCE = 40
export const VOLUME_SCALE = 0.05
