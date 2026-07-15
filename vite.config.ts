import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served under islandsinthenet.padimai.net/guide/ (mounted as a static dir on the check-in service).
  base: '/guide/',
  plugins: [react()],
  // /visitors proxies to a locally-running islandsinthenet service so the archive save works in dev.
  server: { port: 5173, proxy: { '/visitors': 'http://localhost:8095' } },
  preview: { port: 4173 }
})
