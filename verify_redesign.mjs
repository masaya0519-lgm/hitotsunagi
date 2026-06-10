import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:5173');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(500);

// 探す（メイン画面）
await page.screenshot({ path: 'redesign_explore.png' });

// ユーザーカード
const cards = await page.locator('button.border-rose-50').all();
await cards[0].click();
await page.waitForTimeout(500);
await page.screenshot({ path: 'redesign_profile_modal.png' });

// 声をかけてみる → RequestModal
await page.locator('button').filter({ hasText: '声をかけてみる' }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: 'redesign_request_modal.png' });

// RequestModal を閉じる（X ボタン）
await page.locator('.fixed.inset-0').last().locator('button').filter({ hasText: '' }).first().click({ force: true }).catch(() => {});
// backdrop クリック
await page.locator('.fixed.inset-0').last().click({ position: { x: 5, y: 5 }, force: true }).catch(() => {});
await page.waitForTimeout(300);

// ProfileModal も閉じる
await page.locator('.fixed.inset-0').last().click({ position: { x: 5, y: 5 }, force: true }).catch(() => {});
await page.waitForTimeout(300);

// やりとりタブ（サイドバー）
await page.locator('aside nav button').nth(1).click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'redesign_sessions.png' });

// ひろばタブ
await page.locator('aside nav button').nth(2).click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'redesign_boshuu.png' });

// プロフィールタブ
await page.locator('aside nav button').nth(3).click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'redesign_mypage.png' });

await browser.close();
console.log('DONE');
