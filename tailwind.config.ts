
import { tailwindPlugin as prefectDesignTailwindPlugin } from '@prefecthq/prefect-design'
import type { Config } from 'tailwindcss'

// eslint-disable-next-line import/no-default-export
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [prefectDesignTailwindPlugin],
} satisfies Config