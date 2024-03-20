import { Scene, Loader } from 'phaser'

import { type ControlsType, CONTROLS, MAX_FORCE, VOLUME_SCALE } from '@/utils/conts'
import { type GameLevelType, BALL_WIDTH, BALL_WIDTH_HALF, DEFAULT_FORCE_SCALE, DEFAULT_GRAVITY_SCALE, GAME_LEVELS, LINE_HEIGHT }  from '@/utils/game_settings'
import { getRandomInt, calculateVectorLength } from '@/utils/helpers'

export type BallOptType = {
  frictionAir: number
  friction: number
  frictionStatic: number
  restitution: number
  density: number
}

export type WallOptType = {
  restitution: number
  isStatic: boolean
  thickness: number
  viewedArea: number
}

export class GameOpt extends Scene {
  spikesHeight: number
  topLimit: number
  controlType: ControlsType
  cursors: any
  forceScale: number
  gravitySensor: any
  gravityScale: number
  btnControls: any
  forceMultiplier: number
  ball: any
  obj: BallOptType
  wallsObj: WallOptType
  maxHolesCount: number
  play: boolean
  speed: number
  bgSpeed: number
  score: number
  distance: number
  lineDistance: number
  checkTimerInt: number
  background: any
  bgScale: number
  wallTile: string
  volume: boolean
  collisionSound: any
  level: number
  btnDir: 1 | -1 | 0
  lines: any[][]
  pointerStart: null | { x: number; y: number, lastPointerTime: number }
  checkTimer: null | ReturnType<typeof setInterval>
  levelTimeout: null | ReturnType<typeof setInterval>
  levels: { [key: number]: GameLevelType }
  gameUpdate: (opt: { score: number, speed: number }) => void
  gameEnd: () => void

  constructor({ controlType, volume, gameUpdate, gameEnd }: { controlType: ControlsType, volume: boolean, gameUpdate: (opt: { score: number, speed: number }) => void, gameEnd: () => void }) {
    super('main')

    this.spikesHeight = 20
    this.topLimit = this.spikesHeight + BALL_WIDTH_HALF
    this.controlType = controlType
    this.cursors = null
    this.forceScale = DEFAULT_FORCE_SCALE
    this.gravitySensor = null
    this.gravityScale = DEFAULT_GRAVITY_SCALE
    this.btnControls = null
    this.btnDir = 0
    this.forceMultiplier = 0.1
    this.ball = null
    this.volume = volume
    this.level = 0
    this.maxHolesCount = 2
    this.play = true
    this.speed = 1
    this.bgSpeed = 1
    this.score = 0
    this.distance = 0
    this.lineDistance = 200
    this.checkTimer = null
    this.levelTimeout = null
    this.checkTimerInt = 5000
    this.background = null
    this.bgScale = 1
    this.wallTile = `tiles-0`
    this.collisionSound = null
    this.lines = []
    this.pointerStart = { x: 0, y: 0, lastPointerTime: 0 }
    this.levels = GAME_LEVELS
    this.obj = {
      frictionAir: 0,
      friction: 0,
      frictionStatic: 1,
      restitution: 0,
      density: 1,
    }
    this.wallsObj = {
      restitution: 0,
      isStatic: true,
      thickness: LINE_HEIGHT,
      viewedArea: 10,
    }
    this.gameUpdate = gameUpdate
    this.gameEnd = gameEnd
    this.configLevel(this.levels[this.level])
  }

  preload() {
    this.load.image('ball', './img/round-ball.png')
    this.load.image('background', './img/bg/bg-4.webp')

    Object.values(GAME_LEVELS).forEach((level) => {
      this.load.image(`tiles-${level.ind}`, `./img/tiles/p-${level.ind}.png`)
    })

    this.load.image(`tiles-0`, `./img/tiles/p-0.png`)

    this.load.audio('collision', './sounds/stone.mp3')
  }

  create() {
    this.createControls()

    this.setBg()

    this.collisionSound = this.sound.add('collision')

    this.createBall()
    this.checkLines()
    this.updateLevel()
  }

  update() {
    if (!this.play) return

    // this.updateKeybord()

    this.background.tilePositionY = this.background.tilePositionY + this.bgSpeed

    this.moveLines()
    this.handleCollision()
  }

  loadNextTile(nextTile: number) {
    this.scene.scene.load.image(`tiles-${nextTile}`, `./img/tiles/p-${nextTile}.png`)
    this.scene.scene.load.once(Loader.Events.COMPLETE, () => {
      this.scene.scene.textures.remove(this.wallTile)
      this.wallTile = `tiles-${nextTile}`
    })
    this.scene.scene.load.start()
  }

  setBg() {
    const image = this.textures.get('background').source[0]
    const width = this.game.config.width as number
    const height = this.game.config.height as number
  
    this.bgScale = Number((Math.min(width / image.width, height / image.height)).toFixed(2))

    this.background = this.add.tileSprite(0, 0, width / this.bgScale, height / this.bgScale, 'background')
    this.background.setPosition(width / 2, height / 2)

    this.background.setDisplaySize(width, height)
  }

  createControls() {
    if (this.controlType === CONTROLS.GRAVITY) this.initGravityControls()
    else if (this.controlType === CONTROLS.SWIPE) this.initSwipeControls()
    // else if (this.controlType === CONTROLS.KEYBOARD) this.initKeyboardControls()
    // else if (this.controlType === CONTROLS.BUTTON) this.initButtonControls()
  }

  destroyControls() {
    if (this.controlType === CONTROLS.GRAVITY) this.destroyGravityControls()
    else if (this.controlType === CONTROLS.SWIPE) this.destroySwipeControls()
    // else if (this.controlType === CONTROLS.KEYBOARD) this.initKeyboardControls()
    // else if (this.controlType === CONTROLS.BUTTON) this.initButtonControls()
  }

  initGravityControls() {
    this.gravitySensor = new GravitySensor({ frequency: 60 })

    this.gravitySensor.addEventListener('reading', () => {
      if (!this.play) return

      // @ts-ignore
      this.matter.world.engine.gravity.x = -1 * Number((this.gravitySensor.x * this.gravityScale).toFixed(2))
      // @ts-ignore
      this.matter.world.engine.gravity.y = Number((this.gravitySensor.y * this.gravityScale).toFixed(2))
      // @ts-ignore
      this.ball.setAngularVelocity(Math.sign(this.matter.world.engine.gravity.x) * this.forceScale / 2)
    })

    this.gravitySensor.start()
  }

  destroyGravityControls() {
    this.gravitySensor?.stop()

    this.gravitySensor = null
  }

  initSwipeControls() {
    this.input.on('pointerdown', this.handleSwipeStart.bind(this))
    this.input.on('pointermove', this.handleSwipeMove.bind(this))
    this.input.on('pointerup', this.handleSwipeEnd.bind(this))
  }

  handleSwipeStart(pointer: any) {
    this.pointerStart = {
      x: pointer.position.x,
      y: pointer.position.y,
      lastPointerTime: this.time.now
    }
  }

  handleSwipeMove(pointer: any) {
    if (this.play && this.pointerStart) {
      const sign = Math.sign(pointer.position.x - this.pointerStart.x)
      
      this.matter.applyForceFromAngle(this.ball.body, sign, this.forceScale)
      this.ball.setAngularVelocity(sign * this.forceScale / 2)
    }
  }

  handleSwipeEnd() {
    this.pointerStart = null
  }

  destroySwipeControls() {
    this.input.off('pointerdown', this.handleSwipeStart.bind(this))
    this.input.off('pointermove', this.handleSwipeMove.bind(this))
    this.input.off('pointerup', this.handleSwipeEnd.bind(this))
  }

  handleCollision() {
    if (this.ball.body.position.y <= this.topLimit) this.gameStop()
  }

  moveLines() {
    this.updateLines()
    this.updateDistances()
  }

  gameStop() {
    if (!this.play) return

    this.play = false

    if (this.gameEnd) this.gameEnd()
    if (this.checkTimer) clearTimeout(this.checkTimer)
    if (this.levelTimeout) clearInterval(this.levelTimeout)
  }

  destroyGame() {
    this.play = false
    this.destroyControls()
    if (this.checkTimer) clearTimeout(this.checkTimer)
  }

  restartGame() {
    this.ball.setPosition(this.ball.body.position.x, this.topLimit)
    this.forceScale = DEFAULT_FORCE_SCALE
    this.gravityScale = DEFAULT_GRAVITY_SCALE
    this.forceMultiplier = 0.1

    this.obj = {
      frictionAir: 0,
      friction: 0,
      frictionStatic: 1,
      restitution: 0,
      density: 1,
    }

    this.wallsObj = {
      restitution: 0,
      isStatic: true,
      thickness: 400,
      viewedArea: 10,
    }

    this.bgSpeed = 1
    this.speed = 1
    this.score = 0
    this.distance = 0
    this.lineDistance = 200
    this.checkTimer = null
    this.destroyAllLines()
    this.play = true
    this.level = 0
    this.configLevel(this.levels[this.level])
    
    // Object.values(GAME_LEVELS).forEach((level) => {
    //   this.load.image(`tiles-${level.ind}`, `./img/tiles/p-${level.ind}.png`)
    // })

    this.updateLevel()
  }

  createBall() {
    this.ball = this.matter.add.sprite(((this.game.config.width as number) + BALL_WIDTH) / 2, this.topLimit, 'ball')
    this.ball.gameObject = this.ball.setCircle(BALL_WIDTH, this.obj)
    this.ball.setScale(BALL_WIDTH / this.ball.width)

    this.matter.world.setBounds(0, 0, this.game.config.width as number, this.game.config.height as number)
    this.matter.world.on('collisionstart', ((event: any, bodyA: any, bodyB: any) => {
      this.handleWallCollision(event, bodyA, bodyB, this)
    }), this)
  }

  handleWallCollision(event: any, bodyA: any, bodyB: any, $this: any) {
    if ($this.volume && (bodyA === this.ball.body) && bodyB?.gameObject?.type === 'TileSprite') {
      const pair = event.pairs[0]
 
      if (pair.bodyA.velocity) {
        const force = calculateVectorLength(pair.bodyA.velocity) * VOLUME_SCALE
  
        if (force > 0.3) {
          this.collisionSound.setVolume(Math.min(Number(force.toFixed(2)), MAX_FORCE))
          this.collisionSound.play()
        }
      }
    }
  }

  updateLevel() {
    this.levelTimeout = setInterval(() => {
      this.level += 1

      if (this.levels[this.level]) this.configLevel(this.levels[this.level])
      else if (this.levelTimeout) clearInterval(this.levelTimeout)
    }, this.checkTimerInt)
  }

  checkLines() {
    this.checkTimer = setInterval(() => {
      this.lines = this.lines.filter((line) => {
        if (line[0]?.body.position.y + LINE_HEIGHT < 0) {
          line.forEach((linePart) => {
            linePart.body.destroy()
            linePart.destroy()
          })
          return false
        }
        return true
      })

    }, this.checkTimerInt)
  }

  destroyAllLines() {
    this.lines.forEach((line) => {
      line.forEach((linePart) => linePart.destroy())
    })

    this.lines = []
  }

  updateDistances() {
    this.distance += this.speed

    if (this.lineDistance <= this.distance) {
      this.distance = this.distance - this.lineDistance

      this.score += 1
      this.showScore()

      this.createLine()
    }
  }

  toggleVolume(value: boolean) {
    this.volume = value
  }

  updateLines() {
    this.lines.forEach((line) => {
      line.forEach((linePart) => {
        linePart.setPosition(linePart.body.position.x, linePart.body.position.y - this.speed)
      })
    })
  }

  createLine() {
    const platformWidth = this.game.config.width as number
    const platformHeight = this.game.config.height as number

    const holesCount = getRandomInt(1, this.maxHolesCount + 1)
    const sliceSize = platformWidth / holesCount
    const holePositions: any[] = []

    for (let i = 0; i < holesCount; i += 1) {
      const holePosition = getRandomInt(i * sliceSize + BALL_WIDTH / 2, (holesCount > 1 ? (i + 1) * sliceSize : platformWidth) - BALL_WIDTH / 2)
      holePositions.push(holePosition)
    }

    const lines = []

    holePositions.reduce((shift, p, i) => {
      const prev = holePositions[i - 1] || 0
      let width = p - prev - (i ? BALL_WIDTH : BALL_WIDTH / 2)
      let remainder = width % LINE_HEIGHT
      width -= remainder

      if (width) {
        const tileSprite = this.add.tileSprite(prev + ((i ? (BALL_WIDTH + remainder) : 0) + width) / 2, platformHeight + LINE_HEIGHT / 2, width, LINE_HEIGHT, this.wallTile)

        const body = this.matter.add.gameObject(tileSprite, this.wallsObj)

        // @ts-ignore
        body.body['settedtype'] = 'line'
  
        lines.push(tileSprite)
      }

      return shift + p
    }, 0)

    const lastPoint = holePositions[holePositions.length - 1]
    let width = platformWidth - lastPoint - BALL_WIDTH / 2
    let remainder = width % LINE_HEIGHT
    width -= remainder

    if (width) {
      const lastPart = this.add.tileSprite(lastPoint + remainder + (BALL_WIDTH + width) / 2, platformHeight + LINE_HEIGHT / 2, width, LINE_HEIGHT, this.wallTile)
  
      const lastPartBody = this.matter.add.gameObject(lastPart, this.wallsObj)
  
      lines.push(lastPart)

      // @ts-ignore
      lastPartBody.body['settedtype'] = 'line'

      this.lines.push(lines)
    }
  }

  configLevel(levelOpt: GameLevelType) {
    if (levelOpt.speed) {
      this.speed = levelOpt.speed
      this.bgSpeed = Math.floor(Number((levelOpt.speed / this.bgScale).toFixed(2)))
    }
    // if (levelOpt?.ind) this.scene.scene.textures.remove(this.wallTile)
    this.wallTile = `tiles-${levelOpt.ind}`
    if (levelOpt.gravityScale) this.gravityScale = levelOpt.gravityScale
  }

  showScore() {
    if (this.gameUpdate) this.gameUpdate({ score: this.score, speed: this.speed })
  }

  // initKeyboardControls() {
  //   this.cursors = this.input?.keyboard?.createCursorKeys()
  // }

  // updateKeybord() {
  //   if ((this.controlType !== CONTROLS.KEYBOARD && this.controlType !== CONTROLS.BUTTON) || !this.play) return

  //   if (this.cursors?.left.isDown || this.btnDir === -1) {
  //     this.matter.applyForceFromAngle(this.ball.body, -Math.PI / 2, this.forceScale)
  //   } else if (this.cursors?.right.isDown || this.btnDir === 1) {
  //     this.matter.applyForceFromAngle(this.ball.body, Math.PI / 2, this.forceScale)
  //   }
  // }

  // destroyKeyboardControls() {
  //   this.input.keyboard.removeCursorKeys()

  //   this.cursors = null
  // }

  // initButtonControls() {
  //   this.btnControls = document.querySelector('.controls')

  //   if (!this.btnControls) return

  //   this.btnControls.classList.add('controls--active')

  //   this.btnControls.addEventListener('mousedown', this.mousedown.bind(this))
  //   this.btnControls.addEventListener('touchstart', this.mousedown.bind(this))

  //   document.addEventListener('mouseup', this.mouseup.bind(this))
  //   document.addEventListener('touchend', this.mouseup.bind(this))
  //   document.addEventListener('touchcancel', this.mouseup.bind(this))
  // }

  // mousedown(e) {
  //   const btn = e.target.closest('[data-dir]')

  //   if (!btn) return

  //   this.btnDir = btn.dataset.dir === 'left' ? -1 : 1
  // }

  // mouseup() {
  //   this.btnDir = 0
  // }

  // destroyButtonControls() {
  //   this.btnControls.removeEventListener('mousedown', this.mousedown.bind(this))
  //   this.btnControls.removeEventListener('touchstart', this.mousedown.bind(this))
  //   document.removeEventListener('mouseup', this.mouseup.bind(this))
  //   document.removeEventListener('touchend', this.mouseup.bind(this))
  //   document.removeEventListener('touchcancel', this.mouseup.bind(this))
  //   this.btnControls.classList.remove('controls--active')
  //   this.btnControls = null
  //   this.btnDir = 0
  // }
}
