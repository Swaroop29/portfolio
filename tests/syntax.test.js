// Catches the exact failure we had: a typo in a JS file that silently blanks the page.
const test = require('node:test');
const assert = require('node:assert');
const vm = require('vm');
const { read } = require('./helpers');

for (const file of ['data.js', 'script.js']) {
  test(`${file} is valid JavaScript`, () => {
    assert.doesNotThrow(() => new vm.Script(read(file), { filename: file }));
  });
}

test('data.js runs and defines projects, repos and skills', () => {
  const { loadData } = require('./helpers');
  const d = loadData();
  assert.ok(Array.isArray(d.projects) && d.projects.length > 0, 'projects');
  assert.ok(Array.isArray(d.repos) && d.repos.length > 0, 'repos');
  assert.ok(Array.isArray(d.skills) && d.skills.length > 0, 'skills');
});

test('CSS has balanced braces', () => {
  const css = read('style.css').replace(/\/\*[\s\S]*?\*\//g, '');
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  assert.strictEqual(open, close, `{ count ${open} vs } count ${close}`);
});
