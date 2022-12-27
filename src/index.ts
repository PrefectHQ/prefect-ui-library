import '@prefecthq/vue-charts/dist/style.css'
import '@prefecthq/radar/dist/style.css'
import '@prefecthq/graphs/dist/style.css'

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
import { clearOldCacheKeys } from '@/utilities/cache'

// hacky safeguard for keeping window references from breaking the umd build
// which is used for node and specifically integration tests in orion-ui
// the specific window reference that's causing issues is in the pixi-viewport
// package. But this should also safeguard us from other window references sneaking
// into the umd bundle.
if (typeof window === 'undefined') {
  const window = {}

  Object.assign(global, { window })
}

const plugin: Plugin = {
  install(app: App) {
    app.use(ToastPlugin)

    clearOldCacheKeys()
  },
}

export { plugin }
