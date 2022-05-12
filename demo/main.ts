import { createApp } from 'vue'

import './style.css'
import '@prefecthq/prefect-design/dist/style.css'
import '@/styles/style.css'

import App from './App.vue'

const app = createApp(App)

app.config.performance = true

app.mount('#app')
