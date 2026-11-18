// File checks: nothing the page points at is missing, and scripts load in the right order.
const test = require('node:test');
const assert = require('node:assert');
const { read, exists } = require('./helpers');

const html = read('index.html');

test('every local src/href in index.html exists', () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])
    .filter((u) => u && !/^(https?:|\/\/|mailto:|tel:|#|data:)/.test(u));
  assert.ok(refs.length > 0);
  for (const r of refs) assert.ok(exists(r), `missing file: ${r}`);
});

test('every assets/ file mentioned in scripts or data exists', () => {
  const text = read('script.js') + read('data.js') + read('style.css');
  for (const m of text.matchAll(/assets\/[\w.\-]+/g)) assert.ok(exists(m[0]), `missing file: ${m[0]}`);
});

test('data.js loads before script.js', () => {
  const d = html.indexOf('src="data.js"');
  const s = html.indexOf('src="script.js"');
  assert.ok(d > -1 && s > -1, 'both scripts must be included');
  assert.ok(d < s, 'data.js must come first');
});

test('analytics.js loads after the page script', () => {
  const s = html.indexOf('src="script.js"');
  const a = html.indexOf('src="analytics.js"');
  assert.ok(a > s && s > -1, 'analytics.js must be included after script.js');
});

test('every id the script looks up exists in the page', () => {
  const ids = [...read('script.js').matchAll(/getElementById\('([^']+)'\)/g)].map((m) => m[1]);
  const missing = [...new Set(ids)].filter((id) => !new RegExp(`id="${id}"`).test(html));
  assert.deepStrictEqual(missing, []);
});

test('no merge-conflict markers or leftover debugger statements', () => {
  for (const f of ['index.html', 'script.js', 'data.js', 'style.css']) {
    const t = read(f);
    assert.ok(!/^(<{7}|>{7}) /m.test(t), `${f} has conflict markers`);
    assert.ok(!/\bdebugger\b/.test(t), `${f} has a debugger statement`);
  }
});
