import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // Разрешает доступ извне
    strictPort: true, // Гарантирует запуск на указанном порту
    allowedHosts: ['mini-app-ai.up.railway.app'], // Разрешённый домен
  }
})
