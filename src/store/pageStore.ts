import { ref, computed } from 'vue'
import type { Component } from 'vue'
import { defineStore } from 'pinia'

import { PAGES, type PagesType } from '@/utils/conts'

import SettingsPage from '@/pages/SettingsPage.vue'
import ControlsPage from '@/pages/ControlsPage.vue'
import PlayGround from '@/pages/PlayGround.vue'

export const usePageStore = defineStore('PageStore', () => {
  const currentPage = ref<PagesType>(PAGES.CONTROLS)

  const pages: { [key in PagesType]: Component } = {
    CONTROLS: ControlsPage,
    SETTINGS: SettingsPage,
    PLAYGROUND: PlayGround,
  }

  const currentPageComponent = computed(() => {
    return pages[currentPage.value]
  })

  const backLink = computed(() => {
    if (currentPage.value === PAGES.SETTINGS) return PAGES.CONTROLS
    else if (currentPage.value === PAGES.PLAYGROUND) return PAGES.SETTINGS
    else return ''
  })

  function routeTo(page: PagesType) {
    currentPage.value = page
  }

  function toBackLink() {
    if (backLink.value) routeTo(backLink.value)
  }

  return {
    currentPage,
    currentPageComponent,
    routeTo,
    backLink,
    toBackLink
  }
})
