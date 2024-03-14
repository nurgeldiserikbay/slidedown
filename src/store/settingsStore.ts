import { ref } from 'vue'
import { defineStore } from 'pinia'

import { DEFAULT_USERNAME, CONTROLS, type ControlsType, type IScore } from '@/utils/conts'

export const useSettingsStore = defineStore('SettingsStore', () => {
  const isAnimated = ref(false)
  const settingsActive = ref(false)
  const controlType = ref<ControlsType>(CONTROLS.GRAVITY)
  const savedName = ref(DEFAULT_USERNAME)
  const scores = ref<IScore>()

  function toggleSettings() {
    settingsActive.value = !settingsActive.value
  }

  function setControlType(controlTypeValue: ControlsType) {
    controlType.value = controlTypeValue
  }

  function saveName(name: string = DEFAULT_USERNAME) {
    localStorage.setItem('savedName', name)
    savedName.value = name
  }

  function updateScore(score: number) {
    const newScore: IScore = {
      last: {
        name: savedName.value,
        value: score,
      }
    }
   
    if (!scores.value || !scores.value.best || scores.value.best.value < score) {
      newScore.best = {
        name: savedName.value,
        value: score,
      }
    } else {
      newScore.best = scores.value.best
    }

    localStorage.setItem('scores', JSON.stringify(newScore))
    scores.value = newScore
  }

  function loadPrevValues() {
    if (localStorage.getItem('savedName')) savedName.value = localStorage.getItem('savedName') || DEFAULT_USERNAME
    if (localStorage.getItem('scores')) {
      scores.value = JSON.parse(localStorage.getItem('scores') || '')
    }
  }

  function animationEnd() {
    setTimeout(() => {
      isAnimated.value = true
    }, 1500)
  }

  return {
    isAnimated,
    settingsActive,
    toggleSettings,
    controlType,
    setControlType,
    scores,
    savedName,
    saveName,
    updateScore,
    loadPrevValues,
    animationEnd
  }
})
