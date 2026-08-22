const { chromium } = require('playwright-core');
const path = require('path');
const url = require('url');

const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SRC = path.join(__dirname, 'proposal.html');
const OUT = process.argv[2] || path.join(__dirname, 'Jeddah-Sea-Proposal.pdf');

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));

  await page.goto(url.pathToFileURL(SRC).href, { waitUntil: 'networkidle', timeout: 90000 });
  // Give webfonts a beat to swap in before measuring page boxes.
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await page.waitForTimeout(1500);

  // Report any image that failed to resolve — a missing shot must not ship silently.
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src'))
  );
  if (broken.length) console.log('!! BROKEN IMAGES:', broken);
  else console.log('all images loaded:', await page.evaluate(() => document.images.length));

  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  console.log('PDF ->', OUT);
  await browser.close();
})();
