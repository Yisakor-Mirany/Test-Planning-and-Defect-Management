import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Test-only configuration. The application build still uses vite.config.ts.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
