const defaultTheme = require('tailwindcss/defaultTheme')

const states = ['completed', 'failed', 'running', 'pending', 'scheduled', 'cancelled']

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

const prefectPalette = {
  50: '#F2F6FF',
  100: '#E6EDFF',
  200: '#C0D3FF',
  300: '#9AB8FE',
  400: '#4E82FE',
  500: '#024DFD',
  600: '#0245E4',
  700: '#023ABE',
  800: '#012E98',
  900: '#01267C',
}

module.exports = {
  content: [
    './index.html',
    './demo/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(bg|text)-state-(completed|failed|running|pending|scheduled|cancelled)/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        ...stateColors,
        prefect: prefectPalette,
      },
    },
  },
}