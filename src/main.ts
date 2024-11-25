import '@/assets/scss/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import svgIcon from '@/icons/SvgIcon.vue'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './permission'

// import theme
import './theme/index.scss'

import 'virtual:svg-icons-register'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.component('SvgIcon', svgIcon)

app.use(router)

app.mount('#app')
