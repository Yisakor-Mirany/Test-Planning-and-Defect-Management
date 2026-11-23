# Test Cases — Counter Application

These test cases are derived from requirements R1–R5 in the [test plan](test-plan.md).

**Common starting state for every test case:** load the app fresh, either by opening `http://localhost:5173/` in a new tab or by rendering a new `<App />` in the automated tests. The heading should show `Count: 0`. No test depends on any other test, so the tests can be run in any order.

The automated version of each case is in [`StarterLab04/counter-app/src/App.test.tsx`](../StarterLab04/counter-app/src/App.test.tsx). Each test name starts with the matching test case ID.

## Summary

| ID | Title | Requirement(s) | Multiple actions? |
|---|---|---|---|
| TC-01 | Initial count is 0 | R1 | No |
| TC-02 | Increment increases the count by 1 | R2 | Yes (2 clicks) |
| TC-03 | Decrement from the initial value | R3 | No |
| TC-04 | Decrement from a positive value | R2, R3 | Yes |
| TC-05 | Reset returns the count to 0 | R2, R4 | Yes |
| TC-06 | Mixed sequence of Increment, Decrement, and Reset | R2–R5 | Yes |

---

## TC-01 — Initial count is 0

| Field | Detail |
|---|---|
| Objective | Verify that the app shows a count of 0 and all three buttons when it first loads. |
| Starting state | App not yet loaded. |

| Step | Action | Expected result |
|---|---|---|
| 1 | Open (load) the app. | The heading shows `Count: 0`. The **Increment**, **Decrement**, and **Reset** buttons are visible. |

---

## TC-02 — Increment increases the count by 1

| Field | Detail |
|---|---|
| Objective | Verify that each click of Increment adds exactly 1. |
| Starting state | Fresh app, `Count: 0`. |

| Step | Action | Expected result |
|---|---|---|
| 1 | Click **Increment**. | `Count: 1` |
| 2 | Click **Increment**. | `Count: 2` |

---

## TC-03 — Decrement from the initial value

| Field | Detail |
|---|---|
| Objective | Verify that Decrement subtracts exactly 1, starting from 0. |
| Starting state | Fresh app, `Count: 0`. |

| Step | Action | Expected result |
|---|---|---|
| 1 | Click **Decrement**. | `Count: -1` |

---

## TC-04 — Decrement from a positive value

| Field | Detail |
|---|---|
| Objective | Verify that Decrement subtracts exactly 1 from a positive count. This confirms the result in a case that does not involve negative numbers. |
| Starting state | Fresh app, `Count: 0`. |

| Step | Action | Expected result |
|---|---|---|
| 1 | Click **Increment**. | `Count: 1` |
| 2 | Click **Increment**. | `Count: 2` |
| 3 | Click **Decrement**. | `Count: 1` |

---

## TC-05 — Reset returns the count to 0

| Field | Detail |
|---|---|
| Objective | Verify that Reset sets a changed count back to 0. |
| Starting state | Fresh app, `Count: 0`. |

| Step | Action | Expected result |
|---|---|---|
| 1 | Click **Increment**. | `Count: 1` |
| 2 | Click **Increment**. | `Count: 2` |
| 3 | Click **Increment**. | `Count: 3` |
| 4 | Click **Reset**. | `Count: 0` |

---

## TC-06 — Mixed sequence of Increment, Decrement, and Reset

| Field | Detail |
|---|---|
| Objective | Verify that the count is correct after every step of a sequence that uses all three buttons. |
| Starting state | Fresh app, `Count: 0`. |

| Step | Action | Expected result |
|---|---|---|
| 1 | Click **Increment**. | `Count: 1` |
| 2 | Click **Increment**. | `Count: 2` |
| 3 | Click **Increment**. | `Count: 3` |
| 4 | Click **Decrement**. | `Count: 2` |
| 5 | Click **Increment**. | `Count: 3` |
| 6 | Click **Reset**. | `Count: 0` |

**Pass rule for all test cases:** a test case passes only if the displayed text matches the expected result **exactly** after **every** step.
