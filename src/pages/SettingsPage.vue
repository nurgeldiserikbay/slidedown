<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

import IconPlay from '@/assets/img/icons/play.svg?component'

import { PAGES } from '@/utils/conts'
import { usePageStore } from '@/store/pageStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useAudio } from '@/composables/useAudio'

import BackTo from '@/components/main/BackTo.vue'
import ScoreTable from '@/components/main/ScoreTable.vue'

const pageStore = usePageStore()
const settingsStore = useSettingsStore()
const { playAudio } = useAudio()

const name = ref('')

onMounted(() => {
  name.value = settingsStore.savedName
})

function startGame() {
  alert('startGame')
  playAudio('click')
  settingsStore.saveName(name.value)

  alert('startGamed')
  pageStore.routeTo(PAGES.PLAYGROUND)
}

function input(e) {
  if (e.target.value.length > 8) {
    e.target.value = name.value
  }
  name.value = e.target.value
}
</script>

<template>
  <div class="page settings">
    <div class="settings__head">
      <BackTo />
    </div>
    <div class="form">
      <div class="form__name">
        <input :value="name" type="text" @input="input">
      </div>
      <div class="form__control">
        <button class="btn form__start" @click="startGame">
          <IconPlay />
        </button>
      </div>
    </div>
    <ScoreTable class="settings__table" />
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;

  &__name {
    input {
      border: 15px solid #979CB0;
      border-image: url('/public/img/tiles/p-0.png') 30 round round;
      padding: 0.8rem 1rem;
      background: #979CB0;
      font-family: 'LilitaOne', sans-serif;
      font-size: 25px;
      font-weight: bold;
      color: #2F2946;
      outline: none;
      text-transform: uppercase;
      letter-spacing: 4px;
      box-shadow: inset 0 0 10px 0px rgba(0, 0, 0, 0.4);
      border-radius: 15px;
      line-height: 1;

      @media screen and (max-width: 512px) {
        font-size: 16px;
      }
    }
  }

  &__start {
    max-width: 120px;
    width: 25vw;

    svg {
      width: 100%;
      filter: drop-shadow(10px 15px 15px rgb(0 0 0 / 0.8));
      animation: dribble 2s linear infinite;
    }
  }
}
</style>
