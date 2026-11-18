const { test, expect } = require('@playwright/test');
const { watchProblems, enterSite, skipIntro } = require('./helpers');

test('page loads with no script errors, console errors or missing files', async ({ page }) => {
  const problems = watchProblems(page);
  await enterSite(page);
  await page.waitForLoadState('networkidle');
  expect(problems).toEqual([]);
});

test('picker shows the four profiles and choosing one enters the site', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  await expect(page.locator('.profile')).toHaveCount(4);
  await page.locator('.profile[data-id="recruiter"]').click();
  await expect(page.locator('#picker')).toHaveClass(/gone/);
});

test('"Continue as guest" works', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  await page.locator('#skip').click();
  await expect(page.locator('#picker')).toHaveClass(/gone/);
});

test('every section renders its content', async ({ page }) => {
  await enterSite(page);
  await expect(page.locator('#t-projects > *')).toHaveCount(6);
  await expect(page.locator('#t-repos > *')).not.toHaveCount(0);
  await expect(page.locator('#t-skills > *')).not.toHaveCount(0);
  await expect(page.locator('#edu')).toBeAttached();
  await expect(page.locator('.bey')).toHaveCount(4);
});

test('"Open to roles" status and its animated dot are present', async ({ page }) => {
  await enterSite(page);
  const now = page.locator('.recap .now');
  await expect(now).toContainText('Open to roles');
  const anim = await now.locator('i').evaluate((el) => getComputedStyle(el).animationName);
  expect(anim).not.toBe('none');
});

test('every image on the page actually loaded', async ({ page }) => {
  await enterSite(page);
  await page.waitForLoadState('networkidle');
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => i.getAttribute('src') && i.complete && i.naturalWidth === 0).map((i) => i.src));
  expect(broken).toEqual([]);
});

test('contact links are correct', async ({ page }) => {
  await enterSite(page);
  await expect(page.locator('a[href^="mailto:swaroop.patil29@gmail.com"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://github.com/Swaroop29"]').first()).toBeAttached();
});
