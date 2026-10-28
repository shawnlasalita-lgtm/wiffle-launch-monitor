// Smoke test: opens index.html in headless Chromium, fails on JavaScript errors,
// and saves a screenshot so you can look at the page.
//
//   node check.mjs                 -> screenshot at check-screenshot.png (git-ignored)
//   node check.mjs /tmp/shot.png   -> screenshot at that path
//
// Needs Playwright with Chromium available (already installed in Claude cloud sessions).
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

// Resolve Playwright the way require() does, so the globally installed copy is found.
const { chromium } = createRequire(import.meta.url)('playwright');

const out = process.argv[2] || 'check-screenshot.png';
const url = pathToFileURL(resolve('index.html')).href;
const problems = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => problems.push('Uncaught error: ' + e.message));
page.on('console', m => { if (m.type() === 'error') problems.push('Console error: ' + m.text()); });

await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: false });
const title = await page.title();
const text = (await page.innerText('body')).replace(/\s+/g, ' ').slice(0, 300);
await browser.close();

// Network errors for fonts/CDNs are expected offline; only JS failures count.
const real = problems.filter(p => !/net::ERR_|Failed to load resource/.test(p));
console.log(`Title: ${title}`);
console.log(`Body starts: ${text}`);
console.log(`Screenshot: ${resolve(out)}`);
if (real.length) {
  console.log('\nPROBLEMS:');
  real.forEach(p => console.log(' - ' + p));
  process.exit(1);
}
console.log('\nOK: page loaded with no JavaScript errors.');
