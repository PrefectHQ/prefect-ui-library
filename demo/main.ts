import { plugin as PrefectDesign } from '@prefecthq/prefect-design'
import { createApp } from 'vue'

import '@prefecthq/vue-charts/dist/style.css'
import '@prefecthq/prefect-design/dist/style.css'
import '@/styles/style.css'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(PrefectDesign)
app.use(router)

app.config.performance = true

app.mount('#app')
