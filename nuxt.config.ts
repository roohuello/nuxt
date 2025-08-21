// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  routeRules: {
    '/api/**': {
      cors: true,
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase',
    'nuxt-security',
  ],
  css: ['~/assets/css/main.css'],

  pwa: {
    manifest: {
      name: 'Nuxt App',
      short_name: 'NuxtApp',
      description: 'A Nuxt PWA',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
    },
  },
})
