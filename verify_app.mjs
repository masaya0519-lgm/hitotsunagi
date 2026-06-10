import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:5173');
await page.waitForLoadState('networkidle');

const cards = await page.locator('.bg-white.rounded-2xl.shadow-sm').all();
await cards[0].click();
await page.waitForTimeout(400);
await page.screenshot({ path: 'v6_profile_top.png' });

const modal = page.locator('.overflow-y-auto').first();
await modal.evaluate(el => el.scrollTop = 600);
await page.waitForTimeout(150);
await page.screenshot({ path: 'v6_profile_bottom.png' });

await browser.close();
console.log('DONE');
