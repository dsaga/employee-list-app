/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="./@types/jest-extended" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      features: `${path.resolve(__dirname, "./src/features/")}`,
      // public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      types: `${path.resolve(__dirname, "./@types")}`,    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./testSetup.js'],
  }
})
