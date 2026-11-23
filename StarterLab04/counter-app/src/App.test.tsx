import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

// Each test renders a brand-new <App />, so every test case starts at Count: 0
// and does not depend on any other test. Test IDs match docs/test-cases.md.

// Asserts the heading text exactly (e.g. "Count: 1" must not match "Count: 10").
function expectCount(value: number) {
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(`Count: ${value}`)
}

function setup() {
  const user = userEvent.setup()
  render(<App />)
  return {
    user,
    increment: () => user.click(screen.getByRole('button', { name: 'Increment' })),
    decrement: () => user.click(screen.getByRole('button', { name: 'Decrement' })),
    reset: () => user.click(screen.getByRole('button', { name: 'Reset' })),
  }
}

describe('Counter application', () => {
  it('TC-01: displays an initial count of 0 with all three buttons', () => {
    setup()

    expectCount(0)
    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('TC-02: Increment increases the count by 1 on each click', async () => {
    const { increment } = setup()

    await increment()
    expectCount(1)

    await increment()
    expectCount(2)
  })

  it('TC-03: Decrement decreases the count by 1 from the initial state', async () => {
    const { decrement } = setup()

    await decrement()
    expectCount(-1)
  })

  it('TC-04: Decrement decreases the count by 1 from a positive value', async () => {
    const { increment, decrement } = setup()

    await increment()
    await increment()
    expectCount(2)

    await decrement()
    expectCount(1)
  })

  it('TC-05: Reset returns the count to 0 after it has changed', async () => {
    const { increment, reset } = setup()

    await increment()
    await increment()
    await increment()
    expectCount(3)

    await reset()
    expectCount(0)
  })

  it('TC-06: a sequence of Increment, Decrement and Reset produces the correct value at every step', async () => {
    const { increment, decrement, reset } = setup()

    await increment()
    await increment()
    await increment()
    expectCount(3)

    await decrement()
    expectCount(2)

    await increment()
    expectCount(3)

    await reset()
    expectCount(0)
  })
})
