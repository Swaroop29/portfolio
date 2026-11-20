const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const read = f => fs.readFileSync(f, 'utf8');
const { projects, repos, skills } = new Function(read('data.js') + '\nreturn {projects,repos,skills}')();
const html = read('index.html');
const doc = new JSDOM(html).window.document;
const decode = s => new JSDOM('<p>' + s + '</p>').window.document.querySelector('p').textContent;

test('the plain-text version lists every project, repo and skill from data.js', () => {
  const text = doc.getElementById('text-version').textContent;
  assert.ok(text, 'text version section exists');
  for (const p of projects) {
    assert.ok(text.includes(decode(p.t)), 'project title: ' + p.t);
    assert.ok(text.includes(decode(p.built)), 'project description: ' + p.t);
    assert.ok(text.includes(decode(p.stack)), 'project stack: ' + p.t);
  }
  for (const r of repos) assert.ok(text.includes(r.n), 'repo: ' + r.n);
  for (const s of skills) assert.ok(text.includes(decode(s.n)), 'skill: ' + s.n);
});

test('llms.txt is generated and covers projects, repos and skills', () => {
  const md = read('llms.txt');
  for (const p of projects) assert.ok(md.includes('### ' + decode(p.t)), 'llms.txt project: ' + p.t);
  for (const r of repos) assert.ok(md.includes(r.n), 'llms.txt repo: ' + r.n);
  for (const s of skills) assert.ok(md.includes(decode(s.n)), 'llms.txt skill: ' + s.n);
});

test('generated files are up to date (run: node build-seo.js)', () => {
  const before = { html, llms: read('llms.txt'), robots: read('robots.txt'), sitemap: read('sitemap.xml') };
  require('child_process').execFileSync('node', ['build-seo.js'], { stdio: 'ignore' });
  try {
    assert.strictEqual(read('index.html'), before.html, 'index.html text version is stale');
    assert.strictEqual(read('llms.txt'), before.llms, 'llms.txt is stale');
    assert.strictEqual(read('robots.txt'), before.robots);
    assert.strictEqual(read('sitemap.xml'), before.sitemap);
  } finally {
    fs.writeFileSync('index.html', before.html); fs.writeFileSync('llms.txt', before.llms);
    fs.writeFileSync('robots.txt', before.robots); fs.writeFileSync('sitemap.xml', before.sitemap);
  }
});

test('robots.txt allows everyone and points to the sitemap; sitemap lists the site', () => {
  const robots = read('robots.txt');
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow:\s*\//);
  assert.match(robots, /Sitemap: https:\/\/swaroop-patil\.pages\.dev\/sitemap\.xml/);
  assert.match(read('sitemap.xml'), /<loc>https:\/\/swaroop-patil\.pages\.dev\/<\/loc>/);
});

test('structured data describes the person and parses as JSON', () => {
  const ld = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
  assert.strictEqual(ld['@type'], 'Person');
  assert.strictEqual(ld.name, 'Swaroop Patil');
  assert.ok(ld.sameAs.some(u => u.includes('github.com/Swaroop29')));
});
