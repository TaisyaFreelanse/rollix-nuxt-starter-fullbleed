
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
      ]
    }
  },
  css: ['@/assets/css/main.css', '~/assets/css/animations.css', '~/assets/css/responsive.css'],
  tailwindcss: {
    viewer: false
  },
  compatibilityDate: '2024-12-01',
  runtimeConfig: {
    // Private keys (only available on server-side)
    smsRuApiKey: process.env.SMS_RU_API_KEY || '66CCA90D-74B8-6CCB-30C5-05A1D6661AE6'
  }
})
