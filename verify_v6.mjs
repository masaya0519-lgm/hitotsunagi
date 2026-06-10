import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:5173');
await page.waitForLoadState('networkidle');

// ── 1. マイプロフィールタブ（サイドバーのボタン） ──
await page.getByText('マイプロフィール').click();
await page.waitForTimeout(400);
await page.screenshot({ path: 'v6_mypage_top.png' });

await page.locator('main').evaluate(el => el.scrollTop = 700);
await page.waitForTimeout(150);
await page.screenshot({ path: 'v6_mypage_mid.png' });

await page.locator('main').evaluate(el => el.scrollTop = 1500);
await page.waitForTimeout(150);
await page.screenshot({ path: 'v6_mypage_bottom.png' });

// ── 2. 依頼モーダルのOutlookパネル ──
await page.getByText('話を聞ける人を探す').click();
await page.waitForTimeout(400);

const cards = await page.locator('.bg-white.rounded-2xl.shadow-sm').all();
await cards[0].click();
await page.waitForTimeout(500);

await page.getByText('話を聞かせてください').click();
await page.waitForTimeout(400);
await page.screenshot({ path: 'v6_request_modal.png' });

// テンプレ選択
await page.getByText('キャリアパスについて話を聞きたい').click();
await page.waitForTimeout(200);
// Outlookローディング終わるまで待つ
await page.waitForTimeout(1200);
await page.screenshot({ path: 'v6_request_outlook.png' });

// スロット選択
const slotBtn = page.locator('button').filter({ hasText: '6月15日' }).first();
await slotBtn.click();
await page.waitForTimeout(200);
await page.screenshot({ path: 'v6_request_slot_selected.png' });

await browser.close();
console.log('DONE');
