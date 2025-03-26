import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  server: {
    host: '0.0.0.0',  // Allows access from any device on the local network
    port: 5173,       // Make sure the port matches the one you're using
  },
})
