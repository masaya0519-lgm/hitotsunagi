import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// ── セッション1: ボード表示 + フィルター + 応じる ──
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  await page.getByText('募集ボード').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'boshuu_board.png' });

  await page.locator('main').evaluate(el => el.scrollTop = 700);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'boshuu_board_bottom.png' });
  await page.locator('main').evaluate(el => el.scrollTop = 0);

  // タグフィルター
  await page.getByText('SAP導入・運用').first().click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'boshuu_filter.png' });
  await page.getByText('すべて').click();
  await page.waitForTimeout(150);

  // 応じるモーダル
  await page.getByText('応じる').first().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'boshuu_respond_modal.png' });

  // 応じる確定 → Slack表示
  await page.getByText('応じる').last().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'boshuu_slack_after_respond.png' });

  await page.close();
}

// ── セッション2: 「応じました」状態 + 募集を出す ──
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  await page.getByText('募集ボード').click();
  await page.waitForTimeout(400);

  // 募集を出すモーダル
  await page.getByText('募集を出す').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'boshuu_create_modal.png' });

  // タイトル入力
  await page.locator('input').fill('Salesforceプロジェクトの進め方を教えてください');
  await page.waitForTimeout(100);

  // Salesforce導入タグ
  await page.getByText('Salesforce導入').first().click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'boshuu_create_tags.png' });

  // スクロールして時間帯まで
  await page.locator('.bg-white.w-full').evaluate(el => el.scrollTop = 800);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'boshuu_create_scrolled.png' });

  // ランチ派
  await page.locator('button').filter({ hasText: /^ランチ派$/ }).click({ force: true });
  await page.waitForTimeout(200);

  // 投稿
  await page.locator('button').filter({ hasText: '募集を投稿する' }).click({ force: true });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'boshuu_after_create.png' });

  await page.close();
}

await browser.close();
console.log('DONE');
