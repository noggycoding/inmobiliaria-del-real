import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/'  // '/' for Vercel — use '/inmobiliaria-del-real/' for GitHub Pages
})
