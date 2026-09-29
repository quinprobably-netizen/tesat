const { chromium } = require('playwright');
const fs = require('fs');
const HTML = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const OUT = require('os').tmpdir() + '/nightmarket-shots/';
fs.mkdirSync(OUT, { recursive: true });

const now = Math.floor(Date.now() / 1000);
const crypto = s => s.endsWith('-USD');
function series(n, p0) { const c = [], o = [], h = [], l = [], t = []; let p = p0;
  for (let i = 0; i < n; i++) { const op = p; p = p * (1 + (Math.sin(i / 5) + Math.random() - .5) * .004);
    o.push(op); c.push(p); h.push(Math.max(op, p) * 1.002); l.push(Math.min(op, p) * .998); t.push(now - (n - i) * 300); }
  return { o, h, l, c, t }; }
const price = s => 10 + [...s].reduce((a, ch) => a + ch.charCodeAt(0), 0);
function quote(s) { const p = price(s), c = series(30, p).c;
  return { symbol: s, name: s + ' Inc', longName: s + ' Incorporated', type: crypto(s) ? 'CRYPTOCURRENCY' : 'EQUITY',
    exchange: 'NMS', currency: 'USD', price: c[c.length - 1], prevClose: p, dayHigh: p * 1.03, dayLow: p * .97,
    volume: 1e7, high52: p * 1.5, low52: p * .6, marketTime: now, session: { start: now - 3600 * 3, end: now + 3600 * 3 }, c }; }

let serverDown = false;
async function mock(route) {
  const u = new URL(route.request().url());
  if (u.pathname === '/' ) return route.fulfill({ contentType: 'text/html', body: HTML });
  if (serverDown) return route.abort();
  const json = b => route.fulfill({ contentType: 'application/json', body: JSON.stringify(b) });
  switch (u.pathname) {
    case '/api/quotes': return json(u.searchParams.get('symbols').split(',').map(quote));
    case '/api/chart': { const s = u.searchParams.get('symbol'); return json({ ...quote(s), ...series(60, price(s)) }); }
    case '/api/search': return json([{ symbol: 'PLTR', name: 'Palantir', exchange: 'NYSE' }]);
    case '/api/scan': return json({ scanned: 50, rows: ['AAPL', 'TSLA', 'BTC-USD'].map(s => ({ symbol: s, name: s, price: price(s), change: 2.1, volatility: 55, rvol: 1.8, range: 3.2 })) });
    case '/api/news': return json([{ title: 'Headline for ' + (u.searchParams.get('symbol') || 'market'), link: 'https://example.com', publisher: 'Wire', time: now - 600, tickers: ['AAPL'], thumb: null }]);
  }
  return route.fulfill({ status: 404, body: '{}' });
}

const results = [];
const check = (name, ok, info = '') => { results.push([ok ? 'PASS' : 'FAIL', name, info]); };

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  await ctx.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await ctx.route('http://nm.test/**', mock);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); });

  await page.goto('http://nm.test/');
  await page.waitForFunction(() => document.getElementById('statusText').textContent.startsWith('Live'));
  await page.waitForTimeout(500);
  check('Initial load: status is Live', true, await page.textContent('#statusText'));
  check('Watchlist renders 15 default rows', await page.locator('#list .row').count() === 15);
  check('Detail shows selected asset', (await page.textContent('#d-title')).includes('BTC'), await page.textContent('#d-title'));
  check('Chart message hidden after load', await page.locator('#chartMsg').isHidden());
  check('News rail populated', (await page.locator('#symNews li').count()) > 0);
  await page.screenshot({ path: OUT + '1-desktop.png' });

  await page.click('#list .row[data-s="NVDA"]');
  await page.waitForTimeout(300);
  check('Selecting NVDA updates detail', (await page.textContent('#d-title')).includes('NVDA'));

  await page.click('.tabs button[data-f="crypto"]');
  check('Crypto filter shows 6 rows', await page.locator('#list .row').count() === 6, String(await page.locator('#list .row').count()));
  await page.click('.tabs button[data-f="all"]');

  // Screens view, then change the scan mode, then return to the watchlist
  await page.click('.views button[data-v="scan"]');
  await page.waitForSelector('#scanList .row');
  check('Screens view lists results', await page.locator('#scanList .row').count() === 3);
  await page.click('#scModes button[data-m="rvol"]');
  await page.waitForTimeout(300);
  const filterPressed = await page.locator('.tabs button[data-f="all"]').getAttribute('aria-pressed');
  await page.click('.views button[data-v="watch"]');
  const rowsAfter = await page.locator('#list .row').count();
  check('Watchlist still shows rows after changing scan mode', rowsAfter === 15, `rows=${rowsAfter}, "All" aria-pressed=${filterPressed}`);
  await page.click('.tabs button[data-f="all"]');
  await page.click('.views button[data-v="scan"]');
  const modePressed = await page.locator('#scModes button[data-m="rvol"]').getAttribute('aria-pressed');
  check('Scan mode button stays pressed after using watchlist filter', modePressed === 'true', `rvol aria-pressed=${modePressed}`);
  await page.click('.views button[data-v="watch"]');

  // Search + add
  await page.fill('#q', 'pltr');
  await page.waitForSelector('#resultList [data-add="PLTR"]');
  await page.click('#resultList [data-add="PLTR"]');
  await page.waitForTimeout(400);
  check('Adding PLTR puts it in watchlist and selects it', await page.locator('#list .row[data-s="PLTR"]').count() === 1 && (await page.textContent('#d-title')).includes('PLTR'));

  // Position -> holdings
  await page.fill('#qty', '10');
  await page.waitForTimeout(200);
  check('Position value shown', (await page.textContent('#qtyValue')).startsWith('= $'), await page.textContent('#qtyValue'));
  check('Holdings panel shows total', (await page.textContent('#pf')).includes('$'));

  // Chart type + ranges
  await page.click('#ctypes button[data-ct="ha"]');
  for (const r of ['5d', '1mo', '1y', '1d']) { await page.click(`#ranges button[data-r="${r}"]`); await page.waitForTimeout(250); }
  await page.mouse.move(700, 350);
  await page.waitForTimeout(150);
  check('Chart tooltip appears on hover (HA)', await page.locator('#tip').isVisible());
  await page.screenshot({ path: OUT + '2-ha-chart.png' });

  // Remove
  await page.click('#removeBtn');
  await page.waitForTimeout(200);
  check('Remove drops PLTR', await page.locator('#list .row[data-s="PLTR"]').count() === 0);

  // Persistence
  await page.reload();
  await page.waitForFunction(() => document.getElementById('statusText').textContent.startsWith('Live'));
  check('Holdings persist across reload', (await page.evaluate(() => localStorage.getItem('nm.hold'))).includes('PLTR'));

  // Server down
  serverDown = true;
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await page.waitForTimeout(500);
  check('Server down shows error status', await page.locator('#status.err').count() === 1, await page.textContent('#statusText'));
  serverDown = false;

  // Mobile
  const m = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await m.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await m.route('http://nm.test/**', mock);
  await m.goto('http://nm.test/');
  await m.waitForFunction(() => document.getElementById('statusText').textContent.startsWith('Live'));
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  check('Mobile (375px): no horizontal scroll', overflow <= 0, `overflow=${overflow}px`);
  await m.screenshot({ path: OUT + '3-mobile.png', fullPage: false });

  check('No JS errors', errors.length === 0, errors.join(' | '));
  for (const r of results) console.log(r.join('  '));
  await browser.close();
  process.exitCode = results.some(r => r[0] === 'FAIL') ? 1 : 0;
})().catch(e => { console.error(e); for (const r of results) console.log(r.join('  ')); process.exit(1); });
