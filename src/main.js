import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'unfonts.css'
import '@mdi/font/css/materialdesignicons.css'
import { pt } from 'vuetify/locale'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  locale: {
    locale: 'pt',
    messages: { pt },
  },
})

const app = createApp(App)

app.use(vuetify)
app.use(router)

app.mount('#app')
