import prefectDesignConfig from '@prefecthq/prefect-design/src/tailwind.config'
import { Config } from 'tailwindcss/types/config'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import baseConfig from './src/tailwind.config'

const config: Config = {
  content: ['./src/**/*.{vue,js,ts}'],
  presets: [prefectDesignConfig, baseConfig],
}

// eslint-disable-next-line import/no-default-export
export default config