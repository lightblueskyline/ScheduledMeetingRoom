import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Sass 全局變量配置
  css:{
    preprocessorOptions:{
      scss:{
        javascriptEnabled:true,
        additionalData:'@import "./src/styles/variable.scss";'
      }
    }
  }
})
