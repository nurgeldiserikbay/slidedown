<script lang="ts" setup>
import { onMounted } from 'vue'

import { usePageStore } from '@/store/pageStore'
import { useSettingsStore } from '@/store/settingsStore'

import { PAGES } from '@/utils/conts'

import { audioList, useAudio } from '@/composables/useAudio'

import SettingsPage from '@/pages/SettingsPage.vue'
import ControlsPage from '@/pages/ControlsPage.vue'
import PlayGround from '@/pages/PlayGround.vue'

const pageStore = usePageStore()
const settingsStore = useSettingsStore()
const { play } = useAudio()

onMounted(() => {
  settingsStore.loadPrevValues()

  document.addEventListener('click', () => {
    play()
  }, { once: true })
})
</script>

<template>
  <div class="container">
    <audio v-for="audio in audioList" :key="audio" :src="audioList[audio]" class="hide" preload="auto" />
    <Transition  name="fade">
      <ControlsPage v-if="pageStore.currentPage === PAGES.CONTROLS" />
    </Transition>
    <Transition  name="fade">
      <SettingsPage v-if="pageStore.currentPage === PAGES.SETTINGS" />
    </Transition>
    <Transition  name="fade">
      <PlayGround v-if="pageStore.currentPage === PAGES.PLAYGROUND" />
    </Transition>
  </div>
</template>

<style scoped></style>
