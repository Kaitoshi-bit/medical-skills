import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'custom',
      themes: {
        custom: {
          dark: false,
          colors: {
            primary: '#C41E3A',      // яркий красный
            secondary: '#666666',
            accent: '#DC143C',
            error: '#B00020',
            warning: '#F5A623',
            info: '#1A1A1A',
            success: '#2E7D32',
            background: '#E8E0D5',   // крафтовый беж
            surface: '#1A1A1A',      // почти чёрный для карточек
            'surface-variant': '#2C2C2C'
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})