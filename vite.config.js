import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  server: {
    port: 5173,
    proxy: {
      '/api':          { target: 'http://localhost:3001', changeOrigin: true },
      '/content.json': { target: 'http://localhost:3001', changeOrigin: true },
      '/photos':       { target: 'http://localhost:3001', changeOrigin: true },
      '/son.mp3':      { target: 'http://localhost:3001', changeOrigin: true },
    }
  },
  build: { outDir: 'dist' }
})
