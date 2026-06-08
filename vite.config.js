import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy verso WP locale — solo per sviluppo locale
    proxy: {
      '/wp-json': {
        target: 'http://touriscrizione.local',
        changeOrigin: true,
      },
      '/wp-content': {
        target: 'http://touriscrizione.local',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
