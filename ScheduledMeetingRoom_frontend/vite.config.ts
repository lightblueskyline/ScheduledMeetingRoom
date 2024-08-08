import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 獲取環境變量
  let env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        // 相對路徑別名配置，使用 @ 代替 src 文件夾路徑
        '@': path.resolve('./src'),
      }
    },
    // Sass 全局變量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/sassGlobalVariable.scss";'
        }
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_TITLE),
    },
  }
})
