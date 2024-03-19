import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

const START_PATH = '/slidedown'

const VitePWAConf = {
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
  },
  manifest: {
    id: 'com.thelightcome.stonefall',
    name: 'Stone Fall',
    short_name: 'Stone Fall',
    description: 'Stone Fall - In StoneDrop Dash, your task is simple: guide a falling stone left and right through a maze of obstacles, avoiding contact with the upper border at all costs. With increasing speed and relentless challenges, test your reflexes and precision in this addictive arcade adventure. How long can you keep the stone from meeting its end?',
    scope: START_PATH + '/',
    start_url: START_PATH + '/',
    display: 'fullscreen',
    orientation: 'portrait',
    background_color: '#fff',
    lang: 'en',
    theme_color: '#fff',
    protocol_handlers: [
      {
        protocol: 'web+burger',
        name: 'My HTTP Handler',
        uri_template: 'https://mywebapp.com/?url=%s',
        url: '/'
      },
    ],
    icons: [
      {
        src: START_PATH + '/icons/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        src: START_PATH + '/icons/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: START_PATH + '/icons/mstile-70x70.png',
        type: 'image/png',
        sizes: '128x128',
      },
      {
        src: START_PATH + '/icons/mstile-144x144.png',
        type: 'image/png',
        sizes: '144x144',
      },
      {
        src: START_PATH + '/icons/mstile-150x150.png',
        type: 'image/png',
        sizes: '270x270',
      },
      {
        src: START_PATH + '/icons/mstile-310x150.png',
        type: 'image/png',
        sizes: '558x270',
      },
      {
        src: START_PATH + '/icons/mstile-310x310.png',
        type: 'image/png',
        sizes: '558x558',
      },
      {
        src: START_PATH + '/icons/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: START_PATH + '/icons/android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: START_PATH + '/icons/apple-touch-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    display_override: ['window-controls-overlay'],
    screenshots: [
      {
        src: START_PATH + '/screenshots/screenshot1-0ff68546.png',
        type: 'image/png',
        sizes: '540x720',
        form_factor: 'narrow'
      },
      {
        src: START_PATH + '/screenshots/screenshot2-1f78c4db.png',
        type: 'image/jpeg',
        sizes: '540x720',
        form_factor: 'narrow'
      },
      {
        src: START_PATH + '/screenshots/screenshot5-ea50826f.png',
        type: 'image/jpeg',
        sizes: '1024x593',
        form_factor: 'wide'
      },
      {
        src: START_PATH + '/screenshots/screenshot6-0168d284.png',
        type: 'image/jpeg',
        sizes: '1024x593',
        form_factor: 'wide'
      }
    ],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), svgLoader(), VitePWA(VitePWAConf)],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src/')
      },
    ]
  }
})
