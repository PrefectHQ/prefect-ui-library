/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')

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

const generateColorPalette = (base) => {
  const colors = {
    DEFAULT: `hsl(var(--${base}) / <alpha-value>)`,
  }
  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  keys.forEach((key) => colors[key] = `hsl(var(--${base}-${key}) / <alpha-value>)`)
  return colors
}

const colors = () => {
  const primary = generateColorPalette('primary')

  return {
    prefect: primary,
    primary: primary,
    ...stateColors,
    danger: generateColorPalette('danger'),
    success: generateColorPalette('success'),
    foreground: generateColorPalette('foreground'),
    background: generateColorPalette('background'),
  }
}

module.exports = {
  darkMode: 'class',
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
    fontFamily: {
      sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      mono: ['InconsolataVariable', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: colors,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
