import { defineConfig } from 'vitest/config';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  },
  plugins: [
    svgr()
  ]
})