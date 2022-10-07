import '@prefecthq/vue-charts/dist/style.css'
import '@prefecthq/radar/dist/style.css'

export * from './components'
export * from './compositions'
export * from './localization'
export * from './mocks'
export * from './models'
export * from './maps'
export * from './router'
export * from './services'
export * from './types'
export * from './utilities'

import '@/styles/style.css'

import { ToastPlugin } from '@prefecthq/prefect-design'
import { App, Plugin } from 'vue'
import { premojiDirective } from '@/compositions/usePremoji'


const plugin: Plugin = {
  install(app: App) {
    app.use(ToastPlugin)
  },
}

const directive: Plugin = {
  install: (app: App) => app.directive('premoji', premojiDirective),
}

export { plugin, directive }