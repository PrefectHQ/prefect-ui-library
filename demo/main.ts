import '@prefecthq/prefect-design/dist/style.css'
import '@/styles/style.css'

import { plugin as PrefectDesign } from '@prefecthq/prefect-design'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { plugin as OrionDesign } from '@/index'


const app = createApp(App)
app.use(router)
app.use(OrionDesign)
app.use(PrefectDesign)

app.config.performance = true

app.mount('#app')