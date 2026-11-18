// The print view lives in its own file; make sure it is wired up and stays in step with the page.
const test = require('node:test');
const assert = require('node:assert');
const { read } = require('./helpers');

const html = read('index.html');
const print = read('print.css');

test('print.css is linked for printing only', () => {
  assert.ok(/<link[^>]+href="print\.css"[^>]+media="print"/.test(html), 'index.html must link print.css with media="print"');
});

test('contact details printed in the header match the real ones on the page', () => {
  const email = html.match(/class="mail">([^<@\s]+@[^<\s]+)</)[1];
  assert.ok(print.includes(email), `print.css is missing ${email}`);
  const phones = [...html.matchAll(/href="tel:([+\d]+)"/g)].map((m) => m[1].replace(/\D/g, ''));
  assert.strictEqual(phones.length, 2);
  const printDigits = print.replace(/\D/g, '');
  for (const p of phones) assert.ok(printDigits.includes(p.slice(-10)), `print.css is missing phone ${p}`);
});

test('print view does not rely on dark backgrounds', () => {
  assert.ok(/html, body \{[^}]*background: #fff/.test(print));
  assert.ok(/color: #111/.test(print));
});

test('there is no separate "Continue as guest" button any more', () => {
  assert.ok(!html.includes('id="skip"'));
  assert.ok(!/Continue as guest/i.test(html));
});

test('the GitHub row includes the portfolio repo itself', () => {
  const { loadData } = require('./helpers');
  assert.ok(loadData().repos.some((r) => r.u === 'https://github.com/Swaroop29/portfolio'));
});
