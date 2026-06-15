import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    // NGROK + RED LOCAL

  server: {

    host: true,

    allowedHosts: [

      '.ngrok-free.app',

      '.ngrok-free.dev'

    ]

  }
})
