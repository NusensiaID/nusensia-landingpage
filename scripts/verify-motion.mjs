import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  reducedMotion: 'no-preference',
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
await page.goto('http://127.0.0.1:5173/solutions#software');
const samples = await page.evaluate(async () => {
  const title = document.querySelector('[data-node-id="1:4121"]');
  const samples = [];
  const start = performance.now();
  while (performance.now() - start < 2400) {
    const style = getComputedStyle(title);
    samples.push({
      time: performance.now() - start,
      opacity: Number(style.opacity),
      transform: style.transform,
    });
    await new Promise(requestAnimationFrame);
  }
  return samples;
});
assert.ok(
  samples.some((s) => s.opacity < 0.01),
  'Motion should start invisible',
);
assert.ok(
  samples.some((s) => s.opacity > 0.99),
  'Motion should become fully visible',
);
assert.ok(
  samples.some((s) => s.transform.includes('50')),
  'Motion should include the Figma 50px Y offset',
);
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.waitForTimeout(100);
const reduced = await page
  .locator('[data-node-id="1:4121"]')
  .evaluate((el) => ({
    opacity: getComputedStyle(el).opacity,
    transform: getComputedStyle(el).transform,
  }));
assert.equal(reduced.opacity, '1');
assert.ok(reduced.transform === 'none' || reduced.transform === 'matrix(1, 0, 0, 1, 0, 0)');
await page.goto('http://127.0.0.1:5173/');
await page.evaluate(async () => {
  await document.fonts.ready;
  document.querySelectorAll('img').forEach((img) => (img.loading = 'eager'));
  await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
});
await page.locator('.hero').screenshot({ path: 'test-results/final-home-hero.png' });
await page.locator('.cta').screenshot({ path: 'test-results/final-cta.png' });
await page.locator('.products').screenshot({ path: 'test-results/final-products.png' });
await page.goto('http://127.0.0.1:5173/portfolio');
await page.locator('.resources').screenshot({ path: 'test-results/final-resources.png' });
console.log(
  `PASS: ${samples.length} frames over a full Figma animation loop; reduced-motion is static and visible.`,
);
await browser.close();
