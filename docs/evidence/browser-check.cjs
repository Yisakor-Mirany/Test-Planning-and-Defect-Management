// Browser check used for docs/test-execution.md (Section 3.2).
// Drives the running app (npm run dev, http://localhost:5173) in headless Chromium via Playwright,
// executes TC-01..TC-06 three times each, and logs the count after every click.
// Playwright is NOT a project dependency; it was pre-installed in the test machine.
// Usage: node browser-check.cjs <screenshot-output-dir>
const { chromium } = require('playwright');
const IMG = process.argv[2];
const cases = {
  'TC-01': [],
  'TC-02': [['Increment',1],['Increment',2]],
  'TC-03': [['Decrement',-1]],
  'TC-04': [['Increment',1],['Increment',2],['Decrement',1]],
  'TC-05': [['Increment',1],['Increment',2],['Increment',3],['Reset',0]],
  'TC-06': [['Increment',1],['Increment',2],['Increment',3],['Decrement',2],['Increment',3],['Reset',0]],
};
(async () => {
  const browser = await chromium.launch();
  console.log('Browser:', 'Chromium', browser.version());
  for (let attempt = 1; attempt <= 3; attempt++) {
    for (const [id, steps] of Object.entries(cases)) {
      const page = await browser.newPage(); // fresh page = fresh app state
      await page.goto('http://localhost:5173/');
      const h = page.getByRole('heading', { level: 1 });
      const initial = await h.textContent();
      const log = [`initial="${initial}"`];
      let pass = initial === 'Count: 0';
      for (const [btn, exp] of steps) {
        await page.getByRole('button', { name: btn, exact: true }).click();
        const got = await h.textContent();
        const ok = got === `Count: ${exp}`;
        if (!ok) pass = false;
        log.push(`${btn}->exp ${exp} got "${got}"${ok ? '' : ' MISMATCH'}`);
      }
      console.log(`attempt ${attempt} ${id} ${pass ? 'PASS' : 'FAIL'} | ${log.join(' | ')}`);
      if (attempt === 1 && id === 'TC-03') await page.screenshot({ path: `${IMG}/def-001-decrement-from-zero.png`, deviceScaleFactor: 2 });
      await page.close();
    }
  }
  await browser.close();
})();
