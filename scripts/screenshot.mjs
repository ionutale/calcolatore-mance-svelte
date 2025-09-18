import { chromium } from 'playwright';

const url = process.env.SCREENSHOT_URL || 'https://ionutale.github.io/calcolatore-mance-svelte/';
const out = process.env.SCREENSHOT_OUT || 'static/screenshot.png';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  // Wait a bit to ensure fonts/styles settle
  await page.waitForTimeout(500);
  await page.screenshot({ path: out });
  await browser.close();
  console.log(`Saved screenshot to ${out}`);
})();
