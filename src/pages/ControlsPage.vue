<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { usePageStore } from '@/store/pageStore'
import { useSettingsStore } from '@/store/settingsStore'
import { CONTROLS, type ControlsType } from '@/utils/conts'
import { PAGES } from '@/utils/conts'
import { useAudio } from '@/composables/useAudio'

import IconRotate from '@/assets/img/icons/rotate.svg?component'
import IconSwipe from '@/assets/img/icons/swipe.svg?component'
import IconKeyboard from '@/assets/img/icons/keyboard.svg?component'

import AnimBlock from '@/components/main/AnimBlock.vue'
import SoundModal from '@/components/main/SoundModal.vue'

const pageStore = usePageStore()
const settingsStore = useSettingsStore()
const { playAudio } = useAudio()

const isHasGravityControl = ref(true)

function selectControl(controlType: ControlsType) {
  playAudio('click')
  settingsStore.setControlType(controlType)
  pageStore.routeTo(PAGES.SETTINGS)
}

onMounted(() => {
  window.addEventListener('devicemotion', function(event: any){
    if (event.rotationRate.alpha === null || event.rotationRate.beta === null || event.rotationRate.gamma === null) {
      isHasGravityControl.value = false
    } else {
      isHasGravityControl.value = true
    }
  }, { once: true })

  if (!settingsStore.isAnimated) {
    playAudio('falling')
  }
})
</script>

<template>
  <div class="page">
    <SoundModal />
    <AnimBlock :is-animated="settingsStore.isAnimated" />
    <img v-show="!settingsStore.settingsActive" src="/img/logotype.png" alt="logotype" class="logotype" />
    <div v-show="!settingsStore.settingsActive" class="controls">
      <button v-if="isHasGravityControl" class="btn control control__1" :class="{ isAnimated: settingsStore.isAnimated }" @click="selectControl(CONTROLS.GRAVITY)" @animationend="settingsStore.animationEnd"><IconRotate /></button>
      <button v-else class="btn control control__1 control__1--wide" :class="{ isAnimated: settingsStore.isAnimated }" @click="selectControl(CONTROLS.KEYBOARD)" @animationend="settingsStore.animationEnd"><IconKeyboard /></button>
      <button class="btn control control__2" :class="{ isAnimated: settingsStore.isAnimated }" @click="selectControl(CONTROLS.SWIPE)"><IconSwipe /></button>
    </div>
    <a class="privacy_policy" href="https://docs.google.com/document/d/1M4oD7y3zybh1hEEPod4t4_uw6McZz5KPHoOqESkp7uw/edit" target="_blank">Privacy Policy</a>
  </div>
</template>

<style lang="scss" scoped>
.page {
  position: relative;
}

.logotype {
  text-align: center;
  width: 80%;
  max-width: 280px;
  margin-bottom: 60px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  width: 60%;

  .control {
    background: radial-gradient();
    position: relative;
    animation: setting_ball 0.5s linear 1;
    outline: none;

    &__1 {
      max-width: 120px;
      width: 40%;
      animation-delay: 100ms;

      &--wide {
        width: 47%;
        max-width: 200px;
      }
      
      svg {
        animation: dribble 2s linear infinite;
      }
    }

    &__2 {
      max-width: 120px;
      width: 40%;
      
      svg {
        animation: dribble 2s linear 0.2s infinite;
      }
    }

    svg {
      filter: drop-shadow(10px 15px 15px rgb(0 0 0 / 0.8));
    }

    &__1,
    &__2 {
      transition: 0.3s linear;

      &:hover,
      &:active {
        transform: scale(1.1);
      }

      svg {
        width: 100%;
      }
    }

    &.isAnimated {
      animation: none;
    }
  }
}

@keyframes setting_ball {
  0% {
    transform: translateY(-600px);
  }

  100% {
    transform: translateY(0%);
  }
}

.privacy_policy {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-family: Arial, sans-serif;
  font-size: 14px;
  letter-spacing: 3px;
  text-decoration: none;
  font-weight: bold;
  color: #f0f0f0;
}
</style>
