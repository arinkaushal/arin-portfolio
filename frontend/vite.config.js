import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend-only portfolio — no backend proxy needed (EmailJS handles contact)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
