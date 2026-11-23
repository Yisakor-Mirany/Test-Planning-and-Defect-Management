# Test Plan — Counter Application

| Item | Detail |
|---|---|
| Course | AD361 |
| Assignment | Lab 04 — Test Planning and Defect Management |
| Application under test | Counter app (`StarterLab04/counter-app`) |
| Version tested | Starter code as provided in `StarterLab04.zip` (unmodified `src/App.tsx`) |
| Related documents | [Test cases](test-cases.md) · [Test execution](test-execution.md) · [Defect report](defect-report.md) |

## 1. Application Overview

The Counter application is a single-page web app built with React, TypeScript, and Vite. It consists of one component (`App`) that shows:

- A heading that displays the current value in the form **`Count: N`**.
- An **Increment** button.
- A **Decrement** button.
- A **Reset** button.

The count is kept only in the component's memory (React `useState`), starts at `0`, and is not saved anywhere. Reloading the page returns it to `0`.

**Intended behavior (test basis).** The app has no written requirements, so the expected behavior comes from the button labels and the usual meaning of a counter:

| ID | Requirement |
|---|---|
| R1 | When the app loads, the count is `0`. |
| R2 | Each click of **Increment** increases the count by exactly 1. |
| R3 | Each click of **Decrement** decreases the count by exactly 1. Negative values are allowed, because nothing in the app prevents them. |
| R4 | A click of **Reset** sets the count to `0` from any value. |
| R5 | The buttons work correctly in any order or combination. |

## 2. Test Objectives

1. Confirm that the count is `0` when the app loads (R1).
2. Confirm that each button changes the count exactly as its label promises (R2–R4).
3. Confirm that the count stays correct over a sequence of mixed actions (R5).
4. Compare expected and actual results, record pass or fail, and repeat any failed test to check that the result can be reproduced.
5. Report any defect found clearly enough that a developer can reproduce it.

## 3. Scope

### 3.1 In Scope

| Feature | Notes |
|---|---|
| Initial display of the count | Value shown on first render |
| Increment button | Single and repeated clicks |
| Decrement button | From the initial value `0` and from a positive value |
| Reset button | After the count has changed |
| Mixed sequences of the three buttons | Checks that the state is correct at each step |
| Presence of the three buttons | Each button can be found by its visible label |

### 3.2 Out of Scope

| Item | Reason |
|---|---|
| Visual design, CSS, layout, and dark mode | Not part of the counter's functional behavior. |
| Performance and load testing | A local single-component app has no meaningful load profile. |
| Security testing | The app has no input fields, network calls, authentication, or stored data. |
| Full cross-browser and mobile-device matrix | Only one browser engine (Chromium) was available. See Risk P2. |
| Full accessibility audit (WCAG) | The buttons are located by role and name, but no formal audit was done. |
| Very large values (integer overflow) | It would take millions of clicks to reach JavaScript's safe-integer limit. |
| Saving the count across page reloads | The app is not designed to save the count. |
| The build toolchain and third-party libraries | These are covered indirectly by the build and lint checks, not tested directly. |

## 4. Testing Approach

- **Test level:** component and system (UI) testing of the single `App` component.
- **Technique:** black-box functional testing based on R1–R5, using equivalence partitioning:
  - Decrement is tested from `0`, where the result crosses into negative values, and from a positive value.
  - One sequence test combines all three buttons.
- **Test independence:** every test case starts from a freshly loaded app (`Count: 0`) and does not depend on any other test.
- **Execution method:** each test case is run in two ways:
  1. **Automated component tests** with Vitest and React Testing Library. These run in a simulated browser (jsdom) and click the buttons the way a user would, with `user-event`.
  2. **Real-browser execution** against the running dev server (`npm run dev`) in Chromium, driven by a Playwright script. This script records the displayed count after every click.
- **Re-testing:** every failed test is repeated at least three times in each method to confirm the failure is consistent and reproducible.
- **Defect handling:** each confirmed failure is logged in the [defect report](defect-report.md) with severity, priority, and status. The application code is **not** changed during this lab. After a developer fixes a defect, confirmation testing means re-running the failed test cases, and regression testing means re-running all test cases.

## 5. Test Environment and Tools

| Component | Version / Detail |
|---|---|
| Operating system | Ubuntu 24.04.5 LTS (Linux 6.18) |
| Node.js / npm | 22.23.5 / 10.9.9 |
| React / React DOM | 19.3.0 |
| Vite | 8.3.1 |
| TypeScript | 6.0.3 |
| Test runner | Vitest 5.1.1 |
| Component testing | @testing-library/react 16.3.3, @testing-library/user-event 14.6.13, @testing-library/jest-dom 8.0.0 |
| Simulated DOM | jsdom 31.0.1 |
| Real browser | Chromium 157 (headless), driven by Playwright |
| App URL (browser tests) | `http://localhost:5173/`, from `npm run dev` |

## 6. Product Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| P1 | **A button changes the count in the wrong direction or by the wrong amount**, for example a copy-and-paste error in a click handler. Users would see wrong values, and the app's core purpose would fail. | Medium. All three handlers are short, similar inline functions. | High | Test each button separately (TC-02 to TC-05), check every intermediate value in a mixed sequence (TC-06), and test Decrement from two different starting values. |
| P2 | Behavior differs in browsers that were not tested (Firefox, Safari, mobile). | Low. The app uses only standard React and DOM features. | Medium | Run the tests in a real browser (Chromium) as well as jsdom. Cross-browser testing is noted as out of scope. |
| P3 | State carries over between tests and hides or creates failures. | Low | Medium | Load a fresh app for every test case, in both jsdom and the browser. |

## 7. Entry Criteria

Testing may begin when all of the following are true:

1. The starter project is available and unmodified.
2. `npm install` completes without errors.
3. `npm run build` and `npm run lint` complete without errors.
4. The app starts with `npm run dev` and shows `Count: 0` in the browser.
5. The test cases in [test-cases.md](test-cases.md) have been written and reviewed against R1–R5.
6. The testing tools (Vitest, React Testing Library, Chromium) are installed and working.

## 8. Exit Criteria

Testing is complete when all of the following are true:

1. All planned test cases (TC-01 to TC-06) have been executed in both methods, with actual results and pass/fail recorded.
2. Every failed test has been repeated at least three times and the result documented as reproducible or not.
3. Every reproducible failure is logged in a defect report with severity, priority, and status.
4. A test execution summary has been written.

These criteria decide when **this test cycle** is finished. They do not mean the app is ready to release. For release, all High-severity or High-priority defects would also need to be fixed and confirmed by re-testing. See [test-execution.md](test-execution.md) for the current release recommendation.
