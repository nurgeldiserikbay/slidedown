import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

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
    description: 'Stone Fall - ',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fff',
    lang: 'en',
    theme_color: '#fff',
    protocol_handlers: [
      {
        protocol: 'web+burger',
        name: 'My HTTP Handler',
        uri_template: 'https://mywebapp.com/?url=%s'
      },
    ],
    icons: [
      {
        src: '/icons/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        src: '/icons/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: '/icons/mstile-70x70.png',
        type: 'image/png',
        sizes: '128x128',
      },
      {
        src: '/icons/mstile-144x144.png',
        type: 'image/png',
        sizes: '144x144',
      },
      {
        src: '/icons/mstile-150x150.png',
        type: 'image/png',
        sizes: '270x270',
      },
      {
        src: '/icons/mstile-310x150.png',
        type: 'image/png',
        sizes: '558x270',
      },
      {
        src: '/icons/mstile-310x310.png',
        type: 'image/png',
        sizes: '558x558',
      },
      {
        src: '/icons/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: '/icons/apple-touch-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    display_override: ['window-controls-overlay'],
    screenshots: [
      {
        src: '/screenshots/screenshot1-0ff68546.png',
        type: 'image/png',
        sizes: '540x720',
        form_factor: 'narrow'
      },
      {
        src: '/screenshots/screenshot2-1f78c4db.png',
        type: 'image/jpeg',
        sizes: '540x720',
        form_factor: 'narrow'
      },
      {
        src: '/screenshots/screenshot5-ea50826f.png',
        type: 'image/jpeg',
        sizes: '1024x593',
        form_factor: 'wide'
      },
      {
        src: '/screenshots/screenshot6-0168d284.png',
        type: 'image/jpeg',
        sizes: '1024x593',
        form_factor: 'wide'
      }
    ],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
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
