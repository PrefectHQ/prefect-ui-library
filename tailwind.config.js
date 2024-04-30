
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const prefectDesignPlugin = require('@prefecthq/prefect-design/dist/tailwindPlugin.js')
const prefectUiLibraryPlugin = require('./tailwindPlugin.js')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [prefectDesignPlugin, prefectUiLibraryPlugin],
}