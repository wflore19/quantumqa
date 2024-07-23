import { expect, test } from '@playwright/test';
import { chromium } from '@playwright/test';

test.beforeAll(async () => {});

test('Has title', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3001/');
  await expect(page).toHaveTitle(/QuantumQA Admin/);
  await browser.close();
});
