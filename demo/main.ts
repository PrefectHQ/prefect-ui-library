import { createApp } from 'vue'

import '@/styles/style.css'

import App from './App.vue'

const app = createApp(App)

app.config.performance = true

app.mount('#app')
