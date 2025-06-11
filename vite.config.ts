import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron({
      entry: 'electron/main.ts',
    }),
    renderer()
  ],
  server: {
    port: 7777,
  },
})
