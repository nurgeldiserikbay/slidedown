<script lang="ts" setup>
import { useSettingsStore } from '@/store/settingsStore'

import { useAudio } from '@/composables/useAudio'

import IconSetting from '@/assets/img/icons/setting.svg?component'

const settingsStore = useSettingsStore()

const { audioActive, musicActive, toggleAudio, toggleMusic, playAudio } = useAudio()

function activate() {
  playAudio('click')
  settingsStore.toggleSettings()
}
</script>

<template>
  <div class="source-modal">
    <button class="btn source-modal__btn" @click="activate">
      <IconSetting />
    </button>

    <teleport to='body'>
      <div v-if="settingsStore.settingsActive" class="source-modal__overlay" @click="settingsStore.toggleSettings">
        <div class="source-modal__inner" @click.stop="">
          <div class="source" @click="toggleAudio">
            <img v-show="audioActive" src="@/assets/img/icons/sound.png" alt="" />
            <img v-show="!audioActive" src="@/assets/img/icons/sound-brake.png" alt="" />
          </div>
          <div class="source" @click="toggleMusic">
            <img v-show="musicActive" src="@/assets/img/icons/music.png" alt="" />
            <img v-show="!musicActive" src="@/assets/img/icons/music-brake.png" alt="" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.source-modal {
  position: absolute;
  top: 15px;
  left: 15px;

  &__btn {
    svg {
      width: 55px;
      height: 55px;
      filter: drop-shadow(10px 15px 15px rgb(0 0 0 / 0.8));
      animation: dribble 2s linear 0.2s infinite;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__inner {
    /* border: 15px solid #979CB0; */
    /* border-image: url('/public/img/tiles/p-0.png') 30 round round; */
    padding: 0.8rem 1rem;
    /* background: #979CB0; */
    min-width: 250px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 55px;
  }
}

.source {
  position: relative;
  cursor: pointer;
  animation: dribble 2s linear 0.2s infinite;

  img {
    display: block;
    width: 85px;
    height: 85px;
  }
}
</style>
