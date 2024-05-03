import prefectDesignConfig from '@prefecthq/prefect-design/tailwind.config'
import { Config } from 'tailwindcss/types/config'
import baseConfig from '@/tailwind.config'

const config: Config = {
  content: ['./src/**/*.{vue,js,ts}'],
  presets: [prefectDesignConfig, baseConfig],
}

export default config