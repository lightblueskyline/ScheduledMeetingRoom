import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     useMockServer({
//       mockPath: 'mock', // Path to the mock data directory
//       localEnabled: true, // Enable mock in local development
//       prodEnabled: false, // Disable mock in production
//     }),
//   ],
//   // Sass 全局變量配置
//   css: {
//     preprocessorOptions: {
//       scss: {
//         javascriptEnabled: true,
//         additionalData: '@import "./src/styles/variable.scss";'
//       }
//     }
//   }
// })

// export default defineConfig ({ command, mode }: ConfigEnv): UserConfigExport => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     plugins: [
//       vue(),
//       viteMockServe({
//         // default
//         mockPath: 'mock',
//         enable: true,
//       }),
//     ],
//     css: {
//       preprocessorOptions: {
//         scss: {
//           javascriptEnabled: true,
//           additionalData: '@import "./src/styles/variable.scss";'
//         }
//       }
//     }
//   }
// }

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
      }),
    ],
    // Sass 全局變量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_TITLE),
    },
  }
})
