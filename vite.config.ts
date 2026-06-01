import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** 码云 Pages 等子路径部署时设置，例如 BASE_PATH=/delta-force-manual/ */
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
