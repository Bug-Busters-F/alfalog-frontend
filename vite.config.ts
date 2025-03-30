import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Redireciona as requisições API para o servidor Flask
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
