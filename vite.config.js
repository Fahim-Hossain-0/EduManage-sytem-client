import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Remove @tailwindcss/vite import

export default defineConfig({
  plugins: [react()],
  // Remove the tailwindcss() plugin from here
})