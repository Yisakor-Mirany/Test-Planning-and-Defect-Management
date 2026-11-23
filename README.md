# Lab 04 — Test Planning and Defect Management

**Course:** AD361
**Repository:** [github.com/Yisakor-Mirany/Test-Planning-and-Defect-Management](https://github.com/Yisakor-Mirany/Test-Planning-and-Defect-Management)

## Project Overview

This lab applies a full testing process to a small React Counter application:

1. Plan the testing.
2. Design test cases.
3. Execute the tests and compare expected with actual results.
4. Report the defects found.

The application is the provided starter project. Its source code is **unchanged**. Testing found a defect in the Decrement button, and that defect is reported but **intentionally not fixed**, because the goal of the lab is to find and report defects, not to repair them.

## Test Documentation

| Deliverable | Document |
|---|---|
| Step 1: Test plan | [docs/test-plan.md](docs/test-plan.md) |
| Step 2: Test cases | [docs/test-cases.md](docs/test-cases.md) |
| Step 3: Test execution | [docs/test-execution.md](docs/test-execution.md) |
| Step 4: Defect report | [docs/defect-report.md](docs/defect-report.md) |
| Raw test output and the browser script | [docs/evidence/](docs/evidence/) |

## Results Summary

Six test cases were run in two ways: as automated component tests (Vitest + React Testing Library) and against the real running app in a Chromium browser. Each test was run **3 times** with each method.

| ID | Test case | Result |
|---|---|---|
| TC-01 | Initial count is 0 | ✅ Pass |
| TC-02 | Increment increases the count by 1 | ✅ Pass |
| TC-03 | Decrement from the initial value (0 → -1) | ❌ Fail (shows `1`) |
| TC-04 | Decrement from a positive value (2 → 1) | ❌ Fail (shows `3`) |
| TC-05 | Reset returns the count to 0 | ✅ Pass |
| TC-06 | Mixed Increment / Decrement / Reset sequence | ❌ Fail (shows `4` instead of `2` after Decrement) |

**3 passed, 3 failed.** All three failures came from one defect, and it reproduced every time:

> **[DEF-001](docs/defect-report.md): the Decrement button increases the count instead of decreasing it.**
> Severity: High · Priority: High · Status: **Open**

## Application Technologies

- React 19 with TypeScript
- Vite 8 (dev server and build)
- ESLint (linting)
- Vitest, React Testing Library, and jsdom (automated tests, added for this lab)

## Project Structure

```
.
├── README.md                     ← this file
├── docs/                         ← test plan, test cases, execution report, defect report
│   ├── evidence/                 ← raw output from the test runs
│   └── images/                   ← defect screenshot
└── StarterLab04/
    ├── Readme.md                 ← original assignment instructions
    └── counter-app/              ← the application under test
        ├── src/App.tsx           ← Counter component (unchanged from the starter)
        ├── src/App.test.tsx      ← automated tests TC-01 to TC-06 (added)
        ├── src/test/setup.ts     ← test setup (added)
        └── vitest.config.ts      ← test configuration (added)
```

## Setup and Run

You need [Node.js](https://nodejs.org/) **24 LTS** (24.15 or later) or **22.22.2 or later**, plus npm. The testing tools (jsdom) require these versions. Testing for this lab was done on Node 22.23.5.

Move into the app folder:

```bash
cd StarterLab04/counter-app
```

Install the dependencies:

```bash
npm install
```

Start the app, then open the URL it prints (usually http://localhost:5173/):

```bash
npm run dev
```

Other commands:

```bash
npm run build
```

```bash
npm run lint
```

## Running the Tests

From `StarterLab04/counter-app`, run the tests once:

```bash
npm test
```

Or re-run them automatically whenever a file changes:

```bash
npm run test:watch
```

**Expected outcome:** `Tests 3 failed | 3 passed (6)`. The command exits with an error code because the failing tests (TC-03, TC-04, TC-06) correctly detect the open defect DEF-001. This is not a setup problem. After the Decrement button is fixed, all six tests should pass, and that run serves as the confirmation test.

To test by hand in a browser, start the app with `npm run dev` and follow the steps in [docs/test-cases.md](docs/test-cases.md).

## Changes Made to the Starter Project

- **Added:** the test files listed above, plus `test` and `test:watch` scripts and testing dev-dependencies in `package.json`.
- **Not changed:** the application code (`App.tsx`, `main.tsx`, `index.css`), the Vite build configuration, and the ESLint configuration.

## AI Transparency

An AI assistant (Claude Code) helped me draft the documentation, write the automated tests, and run them. All results in this repository come from real test runs. The raw output is saved in [docs/evidence/](docs/evidence/).
