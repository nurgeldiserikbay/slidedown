export const DEFAULT_GRAVITY_SCALE = 0.2
export const DEFAULT_FORCE_SCALE = 0.2
export const LINE_HEIGHT = 30
export const BALL_WIDTH = 35
export const BALL_WIDTH_HALF = BALL_WIDTH / 2

export interface GameLevelType {
  ind?: number
  score: number
  speed: number
}

export type GameLevelsType = {
  [key: number]: GameLevelType
}

export const GAME_LEVELS: GameLevelsType = {
  0: {
    ind: 0,
    score: 10,
    speed: 1,
  },
  1: {
    ind: 1,
    score: 20,
    speed: 1.5,
  },
  2: {
    ind: 2,
    score: 40,
    speed: 1.8,
  },
  3: {
    ind: 3,
    score: 50,
    speed: 2.1,
  },
  4: {
    ind: 4,
    score: 60,
    speed: 2.4,
  },
  5: {
    ind: 5,
    score: 70,
    speed: 2.7,
  },
  6: {
    ind: 6,
    score: 80,
    speed: 3,
  },
  7: {
    ind: 7,
    score: 90,
    speed: 3.3,
  },
  8: {
    ind: 8,
    score: 100,
    speed: 3.6,
  },
  9: {
    ind: 9,
    score: 110,
    speed: 4,
  },
  10: {
    ind: 10,
    score: 110,
    speed: 4,
  },
  11: {
    ind: 11,
    score: 110,
    speed: 4,
  },
  12: {
    ind: 12,
    score: 110,
    speed: 4,
  },
  13: {
    ind: 13,
    score: 110,
    speed: 4,
  },
  14: {
    ind: 14,
    score: 110,
    speed: 4,
  },
  15: {
    ind: 15,
    score: 110,
    speed: 4,
  },
  16: {
    ind: 16,
    score: 110,
    speed: 4,
  },
}
