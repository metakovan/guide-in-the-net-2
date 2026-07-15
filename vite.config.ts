import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served under islandsinthenet.padimai.net/guide/ (mounted as a static dir on the check-in service).
  base: '/guide/',
  plugins: [react()],
  server: { port: 5173 },
  preview: { port: 4173 }
})
