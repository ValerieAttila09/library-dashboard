import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"
import { writeFileSync, readFileSync } from 'fs'

function spa404Plugin() {
  return {
    name: 'spa-404',
    closeBundel() {
      const index = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8')
      writeFileSync(resolve(__dirname, 'dist/404.html'), index)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spa404Plugin()],
  base: "/library-dashboard/",
})
