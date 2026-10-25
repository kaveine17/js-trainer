import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import { router } from './router'
import { useProgressStore } from './stores/progress'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

useProgressStore(pinia).loadProgress()

app.mount('#app')
