const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

// Run data.js in an isolated context and return its arrays.
function loadData() {
  const ctx = vm.createContext({});
  vm.runInContext(read('data.js') + ';this.projects=projects;this.repos=repos;this.skills=skills;', ctx, { filename: 'data.js' });
  return { projects: ctx.projects, repos: ctx.repos, skills: ctx.skills };
}

const isHttps = (u) => { try { return new URL(u).protocol === 'https:'; } catch { return false; } };

module.exports = { root, read, loadData, isHttps, exists: (f) => fs.existsSync(path.join(root, f)) };
