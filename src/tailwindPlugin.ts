import { tailwindPlugin as prefectDesignTailwindPlugin } from '@prefecthq/prefect-design'
import plugin from 'tailwindcss/plugin'
import { Config, PluginCreator } from 'tailwindcss/types/config'

const states = ['completed', 'failed', 'running', 'pending', 'scheduled', 'cancelled', 'crashed', 'paused']

const stateColors = states.reduce<Record<string, Record<number, string>>>((colors, state) => {
  colors[`state-${state}`] = {
    50: `var(--state-${state}-50)`,
    100: `var(--state-${state}-100)`,
    200: `var(--state-${state}-200)`,
    300: `var(--state-${state}-300)`,
    400: `var(--state-${state}-400)`,
    500: `var(--state-${state}-500)`,
    600: `var(--state-${state}-600)`,
    700: `var(--state-${state}-700)`,
    800: `var(--state-${state}-800)`,
    900: `var(--state-${state}-900)`,
  }

  return colors
}, {})

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(bg|text)-state-(completed|failed|running|pending|scheduled|cancelled|crashed|paused)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        ...stateColors,
      },
    },
  },
  plugins: [prefectDesignTailwindPlugin],
}

const prefectUiLibraryPlugins: PluginCreator = function() { /* noop */ }
export const tailwindPlugin = plugin(prefectUiLibraryPlugins, config)