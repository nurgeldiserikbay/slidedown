<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Game } from 'phaser'

import { createGameConfig } from '@/assets/js/main'

import { CONTROLS } from '@/utils/conts'
import { useAudio } from '@/composables/useAudio'

import { useSettingsStore } from '@/store/settingsStore'

import IconReload from '@/assets/img/icons/reload.svg?component'

import BackTo from '@/components/main/BackTo.vue'
import ScoreTable from '@/components/main/ScoreTable.vue'

const settingsStore = useSettingsStore()
const { audioActive, playAudio } = useAudio()

const game = ref<ReturnType<typeof Game>>()
const canvas = ref<HTMLCanvasElement>()

const score = ref(0)
const modalActive = ref(false)

watch(audioActive, () => {
  game.value?.config?.sceneConfig?.toggleVolume(audioActive)
})

onMounted(() => {
  if (canvas.value) {
    const style = getComputedStyle(canvas.value)

    const gameConfig = createGameConfig({
      width: parseInt(style.width),
      height: parseInt(style.height),
      controlType: settingsStore.controlType || CONTROLS.GRAVITY,
      canvas: canvas.value,
      volume: audioActive.value,
      gameEnd: gameEnd,
      gameUpdate: gameUpdate,
    })
   
    game.value = new Game(gameConfig)
  }
})

onBeforeUnmount(() => {
  game.value?.config?.sceneConfig?.gameStop()
  game.value?.destroy(true)
})

function gameEnd() {
  settingsStore.updateScore(score.value)
  modalActive.value = true
}

function gameUpdate({ score: scoreVal }: { score: number }) {
  score.value = scoreVal
}

function restart() {
  playAudio('click')
  score.value = 0
  modalActive.value = false
  game.value?.config?.sceneConfig?.restartGame()
}
</script>

<template>
  <div class="page game">
    <div class="game__score">
      <BackTo />
      <div class="game__score--table">
        <img src="/img/bg/score.webp" alt="" />
        <span>{{ score }}</span>
      </div>
    </div>
    <div class="game__spikes"></div>
    <canvas class="canvas" ref="canvas" />
    <div v-if="modalActive" class="restart-modal">
      <ScoreTable />

      <button class="btn game__start" @click="restart">
        <IconReload />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game {
  position: relative;

  &__spikes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background: url('@/assets/img/spike.svg') repeat-x;
    background-size: auto 100%;
    z-index: 10;
  }

  &__score {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    color: #020202;
    font-weight: 600;
    text-align: right;
    z-index: 20;
  }

  &__score--table {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #2F2946;
    margin-right: 15px;

    img {
      position: absolute;
      right: -5px;
      top: 0;
      width: 70px;
      transform: rotateZ(10deg);
    }

    span {
      position: relative;
      z-index: 1;
    }
  }

  &__start {
    svg {
      width: 65px;
      height: 65px;
      filter: drop-shadow(10px 15px 15px rgb(0 0 0 / 0.8));
      animation: dribble 2s linear infinite;
    }
  }
}

canvas {
  display: block;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.restart-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}
</style>
