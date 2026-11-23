import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Unmount the component after every test so each test case starts from a fresh state.
afterEach(() => {
  cleanup()
})
