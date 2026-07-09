import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy /api calls to the Express backend so the frontend stays presentation-only.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
