import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    plugins: [vue(), svgLoader()],
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vee-validate',
        '@prefecthq/vue-compositions',
        '@prefecthq/prefect-design',
        '@prefecthq/vue-charts',
      ],
      output: {
        exports: 'named',
        // Provide vue as a global variable to use in the UMD build
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
})
