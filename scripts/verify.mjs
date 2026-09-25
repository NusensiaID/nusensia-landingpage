import { chromium } from '@playwright/test';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.BASE_URL || 'http://127.0.0.1:5173';
const output = 'test-results';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const errors = [];
const page = await context.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('response', (r) => {
  if (r.status() >= 400 && r.url().startsWith(base)) errors.push(`${r.status()} ${r.url()}`);
});
const paths = ['/', '/solutions', '/portfolio', '/clients', '/about'];
const report = [];
for (const width of [1440, 1024, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const path of paths) {
    await page.goto(base + path);
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('img').forEach((img) => (img.loading = 'eager'));
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    });
    const result = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelectorAll('h1').length,
      broken: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.getAttribute('src')),
      assets: [...document.images].map((i) => ({
        src: i.getAttribute('src'),
        alt: i.alt,
        width: i.getBoundingClientRect().width,
        height: i.getBoundingClientRect().height,
      })),
    }));
    assert.equal(result.h1, 1, `Expected one h1 on ${path}`);
    assert.ok(
      result.scrollWidth <= width,
      `Overflow on ${path} at ${width}: ${result.scrollWidth}`,
    );
    assert.deepEqual(result.broken, [], `Broken images on ${path}`);
    report.push({ path, width, ...result });
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `${output}/${path === '/' ? 'home' : path.slice(1)}-${width}.png`,
        fullPage: true,
      });
    console.log(`PASS ${path} ${width}px, ${result.assets.length} image placements`);
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base + '/clients');
const first = await page.locator('blockquote').textContent();
await page.getByRole('button', { name: 'Next testimonial' }).click();
assert.notEqual(await page.locator('blockquote').textContent(), first);
await page.getByRole('button', { name: 'Previous testimonial' }).click();
assert.equal(await page.locator('blockquote').textContent(), first);
await page.goto(base + '/solutions');
await page.getByRole('tab', { name: 'Network', exact: true }).click();
assert.equal(
  await page.getByRole('tab', { name: 'Network', exact: true }).getAttribute('aria-selected'),
  'true',
);
assert.ok(await page.getByRole('button', { name: 'Cisco', exact: true }).isVisible());
await page.getByRole('tab', { name: 'Network', exact: true }).press('ArrowRight');
assert.equal(
  await page
    .getByRole('tab', { name: 'Specialized & Tactical Equipment' })
    .getAttribute('aria-selected'),
  'true',
);
await page.goto(base + '/');
await page.getByRole('button', { name: 'Book a Meeting' }).first().click();
await page.getByLabel('Full name').fill('Preview Test');
await page.getByLabel('Work email').fill('test@example.com');
await page.getByLabel('Organization', { exact: true }).fill('Example Organization');
await page
  .getByRole('textbox', { name: 'Your requirements', exact: true })
  .fill('A private AI deployment');
await page.getByRole('button', { name: 'Prepare email' }).click();
const mail = await page.getByRole('link', { name: 'Open email app' }).getAttribute('href');
assert.ok(mail.startsWith('mailto:hello@nusensia.com?'));
assert.ok(decodeURIComponent(mail).includes('A private AI deployment'));
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog').count(), 0);
await page.getByRole('button', { name: 'ID', exact: true }).click();
assert.equal(await page.locator('html').getAttribute('lang'), 'id');
assert.ok((await page.locator('h1').textContent()).includes('Indonesia'));
await page.reload();
assert.equal(await page.locator('html').getAttribute('lang'), 'id');
await page.getByRole('button', { name: 'EN', exact: true }).click();
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole('button', { name: 'Open menu' }).click();
await page
  .getByRole('navigation', { name: 'Main navigation' })
  .getByRole('link', { name: 'About Us' })
  .click();
assert.ok(page.url().endsWith('/about'));
assert.equal(
  await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'),
  'false',
);
await page.goto(base + '/solutions#hardware');
await page.waitForTimeout(150);
const anchor = await page.locator('#hardware').boundingBox();
assert.ok(anchor.y >= 0 && anchor.y < 180, `Anchor is not positioned below header: ${anchor.y}`);
await page.goto(base + '/missing-page');
assert.ok(await page.getByRole('heading', { name: 'Page not found' }).isVisible());
assert.deepEqual(errors, [], 'Browser errors');
const assets = new Set(report.flatMap((r) => r.assets.map((a) => a.src)).filter(Boolean));
for (const src of assets) assert.ok((await stat(`public${src}`)).size > 0, `Empty asset ${src}`);
await writeFile(
  `${output}/verification.json`,
  JSON.stringify({ report, uniqueAssets: assets.size, errors, interactions: 'passed' }, null, 2),
);
console.log(
  `PASS interactive navigation, tabs, carousel, consultation, language persistence, mobile menu, anchors, 404; ${assets.size} local assets verified.`,
);
await context.close();
await browser.close();
