<script lang="ts" setup>
import { usePageStore } from '@/store/pageStore'

import { useAudio } from '@/composables/useAudio'

import IconBack from '@/assets/img/icons/back.svg?component'

const pageStore = usePageStore()

const { playAudio } = useAudio()

function click() {
  playAudio('click')
  pageStore.toBackLink()
}
</script>

<template>
  <button v-if="pageStore.backLink" class="btn back-to" @click="click">
    <IconBack />
  </button>
</template>

<style lang="scss" scoped>
.back-to {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 55px;
  height: 55px;
  z-index: 20;

  svg {
    width: 100%;
    filter: drop-shadow(10px 15px 15px rgb(0 0 0 / 0.8));
    transition: 0;
  }
}
</style>
