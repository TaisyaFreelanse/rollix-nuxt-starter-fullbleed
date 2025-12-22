
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  app: {
    head: {
      title: 'Rollix — доставка роллов',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ],
      script: [
        {
          src: 'https://api-maps.yandex.ru/3.0/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&lang=ru_RU',
          type: 'text/javascript',
          async: true
        }
      ]
    }
  },
  css: ['@/assets/css/main.css', '~/assets/css/animations.css', '~/assets/css/responsive.css'],
  tailwindcss: {
    viewer: false
  },
  compatibilityDate: '2024-12-01',
  nitro: {
    // Настройка для правильной обработки API routes
    routeRules: {
      '/api/**': { cors: true, headers: { 'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE' } }
    }
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    smsRuApiKey: process.env.SMS_RU_API_KEY || '66CCA90D-74B8-6CCB-30C5-05A1D6661AE6',
    iikoApiKey: process.env.IIKO_API_KEY,
    iikoOrganizationId: process.env.IIKO_ORGANIZATION_ID,
    iikoTerminalGroupId: process.env.IIKO_TERMINAL_GROUP_ID,
    iikoApiUrl: process.env.IIKO_API_URL || 'https://api-ru.iiko.services',
    // Public keys (available on client-side)
    public: {
      yandexMapsApiKey: '51d550e0-cf8f-4247-bae5-dfd32b51048d'
    }
  }
})
