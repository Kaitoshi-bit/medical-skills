// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-23',
  devtools: { enabled: true },
  
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/global.scss'
  ],
  
  build: {
    transpile: ['vuetify']
  },
  
  modules: ['@pinia/nuxt'],
  
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  
  // Подключение шрифтов Inter и Oswald
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,700;14..32,900&family=Oswald:wght@400;500;700&display=swap', rel: 'stylesheet' }
      ]
    }
  }
})