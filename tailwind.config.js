/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const prefectDesignPlugin = require('@prefecthq/prefect-design/dist/tailwindPlugin.js')

const states = ['completed', 'failed', 'running', 'pending', 'scheduled', 'cancelled', 'crashed', 'paused']

const stateColors = states.reduce((colors, state) => {
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

module.exports = {
  content: [
    './index.html',
    './demo/**/*.{vue,js,ts,jsx,tsx}',
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
  plugins: [prefectDesignPlugin, require('@tailwindcss/line-clamp')],
}