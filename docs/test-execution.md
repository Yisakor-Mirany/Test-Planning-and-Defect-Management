# Test Execution Report — Counter Application

| Item | Detail |
|---|---|
| Test cycle | Cycle 1: initial execution of all planned test cases |
| Execution date | 2026-11-23 |
| Build under test | Unmodified starter code (`StarterLab04/counter-app/src/App.tsx`) |
| Test cases | [test-cases.md](test-cases.md) (TC-01 to TC-06) |
| Defects raised | [DEF-001](defect-report.md) |

## 1. Test Environment

| Component | Version / Detail |
|---|---|
| Operating system | Ubuntu 24.04.5 LTS (Linux 6.18) |
| Node.js / npm | 22.23.5 / 10.9.9 |
| React / React DOM | 19.3.0 |
| Vite (dev server) | 8.3.1, serving `http://localhost:5173/` |
| Vitest | 5.1.1 |
| React Testing Library | @testing-library/react 16.3.3, user-event 14.6.13, jest-dom 8.0.0 |
| Simulated DOM | jsdom 31.0.1 |
| Real browser | Chromium 157.0.8103.78 (headless), driven by Playwright |

Pre-checks: `npm install`, `npm run build`, and `npm run lint` all completed without errors before testing started, so the entry criteria in the [test plan](test-plan.md#7-entry-criteria) were met.

## 2. Execution Method

Each test case was executed in **two separate ways**:

| Method | What it does | How it was run |
|---|---|---|
| **A. Automated component tests** | Renders a fresh `<App />` in jsdom (a simulated browser), clicks the buttons by their visible labels with `user-event`, and compares the heading text exactly with the expected value. | `npm test` in `StarterLab04/counter-app`, **run 3 times**. Raw output: [`evidence/vitest-run-1.txt`](evidence/vitest-run-1.txt), [`-2`](evidence/vitest-run-2.txt), [`-3`](evidence/vitest-run-3.txt). |
| **B. Real-browser execution** | Starts the real app with `npm run dev`, opens it in Chromium (a **new page for each test case**), clicks the buttons, and records the displayed count **after every step**. | Playwright script [`evidence/browser-check.cjs`](evidence/browser-check.cjs). Each test case was run **3 times**. Raw output: [`evidence/browser-run-results.txt`](evidence/browser-run-results.txt). |

**About "manual" testing:** these tests ran in a cloud environment with no screen, so no person clicked through the app by hand. Method B stands in for manual testing: it performs the same clicks a tester would make, in a real browser running the real app. Method A checks the component on its own in a simulated browser. Both methods gave the same results.

**About multi-step tests in Method A:** an automated test stops at its first failed check. For TC-04 and TC-06, Method A shows the first wrong value, and Method B records the value after every step.

## 3. Results

### 3.1 Results by Test Case

| ID | Step(s) checked | Expected result | Actual result (observed) | Status |
|---|---|---|---|---|
| TC-01 | Load app | `Count: 0`; Increment, Decrement, and Reset buttons visible | `Count: 0`; all three buttons visible | **Pass** |
| TC-02 | Increment ×2 | `Count: 1`, then `Count: 2` | `Count: 1`, then `Count: 2` | **Pass** |
| TC-03 | Decrement ×1 | `Count: -1` | **`Count: 1`** | **Fail** |
| TC-04 | Increment, Increment, Decrement | `1`, `2`, then **`1`** | `1`, `2`, then **`3`** | **Fail** |
| TC-05 | Increment ×3, Reset | `1`, `2`, `3`, then `0` | `1`, `2`, `3`, then `0` | **Pass** |
| TC-06 | Inc, Inc, Inc, **Dec**, Inc, Reset | `1`, `2`, `3`, **`2`**, **`3`**, `0` | `1`, `2`, `3`, **`4`**, **`5`**, `0` | **Fail** |

### 3.2 Step-by-Step Detail for Failed Test Cases (Method B, Chromium)

**TC-03**

| Step | Action | Expected | Actual | Match? |
|---|---|---|---|---|
| — | Load app | `Count: 0` | `Count: 0` | ✅ |
| 1 | Decrement | `Count: -1` | `Count: 1` | ❌ |

**TC-04**

| Step | Action | Expected | Actual | Match? |
|---|---|---|---|---|
| — | Load app | `Count: 0` | `Count: 0` | ✅ |
| 1 | Increment | `Count: 1` | `Count: 1` | ✅ |
| 2 | Increment | `Count: 2` | `Count: 2` | ✅ |
| 3 | Decrement | `Count: 1` | `Count: 3` | ❌ |

**TC-06**

| Step | Action | Expected | Actual | Match? |
|---|---|---|---|---|
| — | Load app | `Count: 0` | `Count: 0` | ✅ |
| 1 | Increment | `Count: 1` | `Count: 1` | ✅ |
| 2 | Increment | `Count: 2` | `Count: 2` | ✅ |
| 3 | Increment | `Count: 3` | `Count: 3` | ✅ |
| 4 | Decrement | `Count: 2` | `Count: 4` | ❌ |
| 5 | Increment | `Count: 3` | `Count: 5` | ❌ (caused by step 4: Increment itself added 1 correctly, 4 → 5) |
| 6 | Reset | `Count: 0` | `Count: 0` | ✅ |

In every failed case, the wrong value appears **right after a Decrement click**, and in each case the count went **up by 1 instead of down by 1**. Increment and Reset behaved correctly every time.

### 3.3 Method A Failure Messages (identical in all 3 runs)

| ID | Vitest assertion output |
|---|---|
| TC-03 | `expected 'Count: 1' to be 'Count: -1'` |
| TC-04 | `expected 'Count: 3' to be 'Count: 1'` |
| TC-06 | `expected 'Count: 4' to be 'Count: 2'` (step 4) |

## 4. Reproduction Attempts for Failed Tests

Each failed test was repeated in both methods. Each attempt started from a freshly loaded app.

| ID | Method A (Vitest): runs failed | Method B (Chromium): attempts failed | Same actual value every time? | Reproducible? |
|---|---|---|---|---|
| TC-03 | 3 / 3 | 3 / 3 | Yes, always `Count: 1` | **Yes (100%)** |
| TC-04 | 3 / 3 | 3 / 3 | Yes, always `Count: 3` | **Yes (100%)** |
| TC-06 | 3 / 3 | 3 / 3 | Yes, always `4` at step 4 and `5` at step 5 | **Yes (100%)** |

The passing tests (TC-01, TC-02, and TC-05) also passed in all 3 runs of both methods.

## 5. Execution Summary

| Metric | Value |
|---|---|
| Test cases planned | 6 |
| Test cases executed | 6 (100%) |
| Passed | 3 (TC-01, TC-02, TC-05) |
| Failed | 3 (TC-03, TC-04, TC-06) |
| Blocked / not run | 0 |
| Total executions | 36 (6 cases × 3 runs × 2 methods) |
| Defects raised | 1: [DEF-001 — Decrement button increases the count instead of decreasing it](defect-report.md) |

**Conclusion.** The initial display (R1), Increment (R2), and Reset (R4) work as expected. **Decrement (R3) does not work.** It consistently adds 1 to the count instead of subtracting 1. Because of this, any sequence that uses Decrement gives a wrong value (R5). All three failures have the same cause, so they are reported as one defect, DEF-001.

The exit criteria for this test cycle are met: every test case was executed, every failure was repeated and confirmed, and the defect has been logged.

**Release recommendation: not ready to release.** DEF-001 is High severity and High priority and is still **Open**.

## 6. Confirmation Testing (Planned After a Fix)

The application code was intentionally **not** changed in this lab. Once a fix for DEF-001 is delivered:

1. **Confirmation testing:** re-run TC-03, TC-04, and TC-06 in both methods. All three must pass.
2. **Regression testing:** re-run TC-01, TC-02, and TC-05 to make sure the fix did not break Increment, Reset, or the initial display.
3. Update the status of DEF-001 based on the results.

To re-run the automated tests, open the `StarterLab04/counter-app` folder and run `npm test`. With the defect still present, the command currently reports **3 failed, 3 passed** and exits with a non-zero code. This is expected.
