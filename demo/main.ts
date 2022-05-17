import { plugin as PrefectDesign } from '@prefecthq/prefect-design'
import { createApp } from 'vue'

import './style.css'
import '@prefecthq/prefect-design/dist/style.css'
import '@/styles/style.css'

import App from './App.vue'

const app = createApp(App).use(PrefectDesign)

app.config.performance = true

app.mount('#app')
