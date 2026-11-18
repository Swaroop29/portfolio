const { test, expect } = require('@playwright/test');
const { enterSite } = require('./helpers');

test('project card opens a modal with details and closes again', async ({ page }) => {
  await enterSite(page);
  await page.locator('#t-projects > *').first().click();
  await expect(page.locator('#modal')).toBeVisible();
  await expect(page.locator('#m-title')).not.toBeEmpty();
  await page.locator('#m-x').click();
  await expect(page.locator('#modal')).toBeHidden();
});

test('Green Hydrogen modal links to the paper, proposal, talk and code', async ({ page }) => {
  await enterSite(page);
  await page.locator('#t-projects > *', { hasText: 'Green Hydrogen' }).click();
  const links = await page.locator('#m-links a').evaluateAll((a) => a.map((x) => x.href));
  for (const needle of ['zenodo.24286217', 'zenodo.24286313', 'youtu.be/8S3LxbVgsYU', 'github.com/Swaroop29/HydrogenHub']) {
    expect(links.some((l) => l.includes(needle)), `missing link containing ${needle}`).toBeTruthy();
  }
});

test('LendEase modal links to its paper', async ({ page }) => {
  await enterSite(page);
  await page.locator('#t-projects > *', { hasText: 'LendEase' }).click();
  const links = await page.locator('#m-links a').evaluateAll((a) => a.map((x) => x.href));
  expect(links.some((l) => l.includes('zenodo.24286315'))).toBeTruthy();
});

test('every project opens without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await enterSite(page);
  const n = await page.locator('#t-projects > *').count();
  for (let i = 0; i < n; i++) {
    await page.locator('#t-projects > *').nth(i).click();
    await expect(page.locator('#modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#modal')).toBeHidden();
  }
  expect(errors).toEqual([]);
});

test('GitHub section lists HydrogenHub and links to it', async ({ page }) => {
  await enterSite(page);
  await expect(page.locator('#t-repos a[href="https://github.com/Swaroop29/HydrogenHub"]')).toBeAttached();
});

test('flip cards: tapping shows the back face and hides the front (mobile mirrored-text regression)', async ({ page }) => {
  await enterSite(page);
  const card = page.locator('.bey').nth(1);
  await card.scrollIntoViewIfNeeded();
  const vis = (sel) => card.locator(sel).evaluate((el) => getComputedStyle(el).visibility);
  expect(await vis('.bf.front')).toBe('visible');
  expect(await vis('.bf.back')).toBe('hidden');
  await card.click();
  await expect(card).toHaveClass(/flip/);
  await expect.poll(() => vis('.bf.back')).toBe('visible');
  await expect.poll(() => vis('.bf.front')).toBe('hidden');
  await card.click();
  await expect.poll(() => vis('.bf.front')).toBe('visible');
  await expect.poll(() => vis('.bf.back')).toBe('hidden');
});

test('PUBG card shows the ID and a QR code that loaded', async ({ page }) => {
  await enterSite(page);
  const card = page.locator('.bey', { hasText: 'Pswapy' }).first();
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await expect(card.locator('.pid')).toContainText('52405181910');
  const loaded = await card.locator('.qr img').evaluate((i) => i.complete && i.naturalWidth > 0);
  expect(loaded).toBeTruthy();
});

test('education timeline expands a stop', async ({ page }) => {
  await enterSite(page);
  await page.locator('#edu').scrollIntoViewIfNeeded();
  await expect(page.locator('#edu .stop').first()).toBeVisible();
});
