import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // yoki kerakli subpath
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // dev server uchun
  }
})
