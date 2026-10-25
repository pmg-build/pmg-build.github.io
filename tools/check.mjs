// Validation for the Projects + Classes sections. Exits non-zero on any failure.
//   node tools/check.mjs                      data + generated-file + sitemap checks (no browser needed)
//   node tools/check.mjs --render [--shots DIR]   also renders every page at 390px and 1280px in headless Chrome,
//                                             compares structure + computed styles across all pages, saves screenshots
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { ROOT, loadData, expectedFiles } from './make-pages.mjs';

const { PORTFOLIO: P, PROJECTS, CLASSES, SITE } = loadData();
const S = P.SCHEMA;
const fails = [], warns = [];
const fail = (m) => fails.push(m), warn = (m) => warns.push(m);
const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const isArr = (v, min = 1) => Array.isArray(v) && v.length >= min;
const today = new Date().toISOString().slice(0, 10);
const walk = (o, cb, trail = '') => { if (typeof o === 'string') cb(o, trail); else if (Array.isArray(o)) o.forEach((x, i) => walk(x, cb, `${trail}[${i}]`)); else if (o && typeof o === 'object') for (const k of Object.keys(o)) walk(o[k], cb, trail ? `${trail}.${k}` : k); };

// ---------- projects ----------
const ids = new Set();
for (const p of PROJECTS) {
  const w = `project "${p.id}"`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) fail(`${w}: id must be a lowercase slug`);
  if (ids.has(p.id)) fail(`${w}: duplicate id`); ids.add(p.id);
  for (const f of ['title', 'summary']) if (!isStr(p[f])) fail(`${w}: missing ${f}`);
  if (!S.statuses.includes(p.status)) fail(`${w}: status must be one of ${S.statuses.join(' / ')}`);
  if (!P.isIsoDate(p.updated)) fail(`${w}: updated must be a valid yyyy-mm-dd`); else if (p.updated > today) fail(`${w}: updated is in the future`);
  if (!isArr(p.tags)) fail(`${w}: tags needed`);
  if (p.links) for (const l of p.links) if (!isStr(l.label) || !/^[a-z0-9][^:]*$/i.test(l.href || '')) fail(`${w}: links must be {label, relative href} (no external URLs)`);

  // proposal (always high-level, always shown)
  const pr = p.proposal || {};
  for (const f of S.proposalFields) {
    if (f === 'timeline') { if (!isArr(pr.timeline)) fail(`${w}: proposal.timeline missing`); else pr.timeline.forEach((t, i) => { if (!isStr(t.phase) || !isStr(t.window) || !S.timelineStatuses.includes(t.status)) fail(`${w}: proposal.timeline[${i}] needs phase, window, status (${S.timelineStatuses.join('/')})`); }); }
    else if (['objectives', 'methodology', 'results'].includes(f)) { if (!isArr(pr[f]) || !pr[f].every(isStr)) fail(`${w}: proposal.${f} must be a non-empty string array`); }
    else if (!isStr(pr[f])) fail(`${w}: proposal.${f} missing`);
  }
  if (pr.methodology && pr.methodology.length > 4) warn(`${w}: methodology has ${pr.methodology.length} steps. Keep it a summary.`);

  // gated sections
  for (const s of S.sections.filter((x) => x.flag)) {
    const sec = p[s.id], sw = `${w}: ${s.id}`;
    if (!sec) { fail(`${sw} section missing`); continue; }
    const v = sec.visibility || S.defaultVisibility;
    if (!S.visibility.includes(v)) fail(`${sw}.visibility "${sec.visibility}" must be one of ${S.visibility.join(' / ')}`);
    if (!isStr(sec.summary)) fail(`${sw}.summary missing`);
    const gated = v !== 'public';
    if (gated && sec.detail) fail(`${sw}: has "detail" but visibility is "${v}" (would leak). Remove it or set visibility to "public".`);
    if (s.id === 'pricing') {
      if (!S.pricingBasis.includes(sec.basis)) fail(`${sw}.basis must be one of ${S.pricingBasis.join(' / ')}`);
      if (!isArr(sec.highlights)) fail(`${sw}.highlights needed`);
      if (v === 'public' && sec.detail && (!isArr(sec.detail.tiers))) fail(`${sw}.detail.tiers needed when public`);
    }
    if (s.id === 'docs') {
      if (!isArr(sec.items)) fail(`${sw}.items needed`); else sec.items.forEach((d, i) => {
        if (!isStr(d.title)) fail(`${sw}.items[${i}] needs title`);
        if (!S.docTypes.includes(d.type)) fail(`${sw}.items[${i}].type must be one of ${S.docTypes.join('/')}`);
        if (!S.docStatuses.includes(d.status)) fail(`${sw}.items[${i}].status must be one of ${S.docStatuses.join('/')}`);
        if (gated && (d.href || d.desc)) fail(`${sw}.items[${i}]: href/desc not allowed unless visibility is public`);
        if (d.status === 'Public' && !d.href && v === 'public') fail(`${sw}.items[${i}]: Public status needs an href`);
      });
    }
    if (s.id === 'security') {
      if (!isArr(sec.highlights)) fail(`${sw}.highlights needed`);
      const fw = sec.frameworks || [];
      for (const need of S.requiredFrameworks) if (!fw.some((f) => f.name === need)) fail(`${sw}: framework "${need}" missing (every project lists the same set)`);
      fw.forEach((f) => { if (!S.frameworkLevels.includes(f.level)) fail(`${sw}: framework "${f.name}" level "${f.level}" must be ${S.frameworkLevels.join('/')}`); if (gated && f.note) fail(`${sw}: framework note not allowed unless public`); });
      if (new Set(fw.map((f) => f.name)).size !== fw.length) fail(`${sw}: duplicate framework`);
    }
    if (s.id === 'revisions') {
      const items = sec.items || [];
      if (items.length < 2) fail(`${sw}: needs at least v0.1 and an End goal`);
      let prev = '';
      items.forEach((r, i) => {
        const rw = `${sw}.items[${i}]`, last = i === items.length - 1, goal = r.version === S.endGoalLabel;
        if (!(goal ? last : new RegExp(S.versionPattern).test(r.version || ''))) fail(`${rw}: version "${r.version}" must match v0.1 style (End goal only as the last item)`);
        if (last && !goal) fail(`${rw}: last item must be "${S.endGoalLabel}"`);
        if (!S.revisionStatuses.includes(r.status)) fail(`${rw}: bad status`);
        if (goal !== (r.status === 'Goal')) fail(`${rw}: status "Goal" is only for the End goal`);
        if (!P.isIsoDate(r.date)) fail(`${rw}: invalid date`); else { if (r.date < prev) fail(`${rw}: dates must not go backwards`); prev = r.date; }
        if (!['actual', 'target'].includes(r.dateType)) fail(`${rw}: dateType must be actual|target`);
        if (r.dateType === 'actual' && r.date > today) fail(`${rw}: "actual" date is in the future`);
        if (r.status === 'Done' && r.dateType !== 'actual') fail(`${rw}: Done items need an actual date`);
        if (r.dateType === 'target' && r.status === 'Done') fail(`${rw}: target date on a Done item`);
        if (!isStr(r.title)) fail(`${rw}: title missing`);
        if (gated && r.notes) fail(`${rw}: notes not allowed unless visibility is public`);
      });
      const nums = items.filter((r) => r.version !== S.endGoalLabel).map((r) => r.version.slice(1).split('.').map(Number));
      for (let i = 1; i < nums.length; i++) if (nums[i][0] < nums[i - 1][0] || (nums[i][0] === nums[i - 1][0] && nums[i][1] <= nums[i - 1][1])) fail(`${sw}: versions must increase`);
      if (items.filter((r) => r.version === S.endGoalLabel).length !== 1) fail(`${sw}: exactly one End goal required`);
    }
  }
  const secKeys = Object.keys(p).filter((k) => S.sections.some((s) => s.id === k));
  if (secKeys.length !== S.sections.length - 0 && !S.sections.every((s) => p[s.id])) fail(`${w}: missing a section`);
}

// ---------- classes ----------
const cids = new Set();
for (const c of CLASSES) {
  const w = `class "${c.id}"`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id || '')) fail(`${w}: id must be a slug`);
  if (cids.has(c.id)) fail(`${w}: duplicate id`); cids.add(c.id);
  if (!isStr(c.title) || !isStr(c.summary)) fail(`${w}: title/summary missing`);
  if (!['In progress', 'Completed'].includes(c.status)) fail(`${w}: status must be In progress|Completed`);
  if (c.code === '' ? c.status !== 'Completed' : !/^\d{2}-\d{3}$/.test(c.code || '')) fail(`${w}: code must look like 90-812 (empty only for Completed classes)`);
  if (c.status === 'In progress' && !isStr(c.term)) fail(`${w}: term required while in progress`);
  if (!c.apply || !isStr(c.apply.summary) || !isArr(c.apply.applications, 3) || !c.apply.applications.every(isStr)) fail(`${w}: apply.summary and 3+ apply.applications required`);
  if (!Array.isArray(c.relatedProjects) || c.relatedProjects.some((id) => !ids.has(id))) fail(`${w}: relatedProjects must be an array of existing project ids`);
}
if (new Set(CLASSES.map((c) => c.code).filter(Boolean)).size !== CLASSES.filter((c) => c.code).length) fail('classes: duplicate course code');

// ---------- public-safety scan (everything in the data files is public) ----------
const common = [
  [/https?:\/\/|www\./i, 'external URL'], [/@[a-z0-9-]+\.[a-z]{2,}/i, 'email address'],
  [/github\.com|gitlab|source code|\brepo\b/i, 'source-code reference'],
  [/\b(ASRC|Werbel|Sensonics|Smith Residence|Example Contracting|Home Depot)\b/i, 'client/employer/confidential name'],
  [/\b(AliExpress|Alibaba|DigiKey|Adafruit|ELEGOO|Uline|HiLetgo)\b/i, 'supplier name'],
  [/\bunit (cost|margin|economics)s?\b|\bnegative margin\b|\bper-unit (cost|margin)\b|\bbreak-?even\b|\blanded cost\b/i, 'unit cost / margin detail']
];
const ctxPublicPricing = (trail) => /\.pricing\.detail/.test(trail);
const scan = (obj, label, extra = []) => walk(obj, (str, trail) => {
  for (const [re, what] of [...common, ...extra]) if (re.test(str) && !(what === 'unit cost / margin detail' && ctxPublicPricing(trail))) fail(`${label} ${trail}: contains ${what} → "${str.slice(0, 70)}"`);
  if (/\bcertif(ied|ication)\b/i.test(str) && !/\b(not|never|no)\b[^.]{0,40}certif/i.test(str)) fail(`${label} ${trail}: never claim certification → "${str.slice(0, 70)}"`);
  if (/\bcompliant with\b|\battested\b/i.test(str)) fail(`${label} ${trail}: avoid "compliant with/attested" (use aligned/considered/planned)`);
});
for (const p of PROJECTS) {
  const gated = JSON.parse(JSON.stringify(p));
  scan(gated, `project "${p.id}"`, [[/(?<![A-Za-z])\$\s?\d/, 'dollar figure'], [/\b\d+(\.\d+)?\s?%/, 'percentage figure']]);
}
scan(CLASSES, 'classes', [[/\b\d{1,2}:\d{2}\b|\b(am|pm)\b|\b(Mon|Tues?|Wed(nes)?|Thu(rs)?|Fri)(day)?\b|\broom\b|\bprofessor\b|\binstructor\b|\bsyllabus\b/i, 'meeting time/room/instructor/syllabus detail']]);

// ---------- generated pages + sitemap + home links ----------
const exp = expectedFiles({ PROJECTS, CLASSES });
for (const [rel, txt] of Object.entries(exp)) {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) fail(`missing page ${rel} (run: node tools/make-pages.mjs)`);
  else if (fs.readFileSync(f, 'utf8') !== txt) fail(`${rel} differs from the template (run: node tools/make-pages.mjs; do not hand-edit generated pages)`);
}
for (const dir of ['projects', 'classes']) for (const d of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }))
  if (d.isDirectory() && !['css', 'js', 'data'].includes(d.name) && !exp[`${dir}/${d.name}/index.html`]) fail(`stale page folder ${dir}/${d.name}`);
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
for (const rel of Object.keys(exp)) { const url = 'https://preet-desai.me/' + rel.replace(/index\.html$/, ''); if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`sitemap.xml is missing ${url}`); }
const home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const need of ['href="projects/"', 'href="classes/"']) if (!home.includes(need)) fail(`index.html is missing a link: ${need}`);

// ---------- notices ----------
if (!SITE.confidentialityConfirmed) warn('SITE.confidentialityConfirmed is false: CONFIRM CONFIDENTIALITY BEFORE PUBLISHING CLIENT WORK, then set it to true.');
if (!SITE.contact.email) warn('SITE.contact.email is empty: a clearly-marked "add your email" placeholder is shown.');
const vis = {}; for (const p of PROJECTS) for (const s of S.sections.filter((x) => x.flag)) { const v = P.vis(p, s.id); vis[v] = (vis[v] || 0) + 1; }
console.log(`checked ${PROJECTS.length} projects, ${CLASSES.length} classes, ${Object.keys(exp).length} generated pages. Section visibility: ${JSON.stringify(vis)}`);

// ---------- optional render check ----------
async function renderCheck() {
  const arg = (n) => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : null; };
  const shots = arg('--shots');
  const req = createRequire(process.env.PLAYWRIGHT_CORE_DIR || '/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/');
  const { chromium } = req('playwright-core');
  const br = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const VIEWS = [['390', 390, 844], ['desktop', 1280, 900]];
  const sig = {}, metrics = {}, hdr = {};
  const pages = [['projects/index.html', 'projects-index'], ['classes/index.html', 'classes-index'],
    ...PROJECTS.map((p) => [`projects/${p.id}/index.html`, `project-${p.id}`]), ...CLASSES.map((c) => [`classes/${c.id}/index.html`, `class-${c.id}`])];
  for (const [vn, w, h] of VIEWS) {
    const ctx = await br.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: vn === '390' ? 2 : 1, isMobile: vn === '390' });
    await ctx.route(/googletagmanager|googleapis|gstatic/, (r) => r.abort());
    for (const [rel, name] of pages) {
      const pg = await ctx.newPage(); const errs = [];
      pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => m.type() === 'error' && !/ERR_FAILED|Failed to load resource/.test(m.text()) && errs.push(m.text()));
      await pg.goto(pathToFileURL(path.join(ROOT, rel)).href); await pg.waitForTimeout(250);
      if (errs.length) fail(`${rel} @${vn}: console errors: ${errs.join('; ')}`);
      const ow = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (ow > 1) fail(`${rel} @${vn}: horizontal overflow ${ow}px`);
      const hh = await pg.evaluate(() => document.querySelector('.site-header .nav-links')?.innerText.replace(/\s+/g, ' ') + '|' + document.querySelector('footer')?.innerText.replace(/\s+/g, ' ').replace(/\d{4}/, 'Y'));
      (hdr[vn] ||= {})[name] = hh;
      const isProject = name.startsWith('project-'), isClass = name.startsWith('class-') && !name.endsWith('index');
      if (isProject) {
        const tabs = await pg.$$eval('[role=tab]', (els) => els.map((e) => e.textContent));
        const heads = await pg.$$eval('[role=tabpanel]', (els) => els.map((e) => e.id + ':' + e.querySelector('h2')?.textContent));
        const props = await pg.$$eval('#panel-proposal .block h3', (els) => els.map((e) => e.textContent));
        const dom = await pg.evaluate(() => [...document.querySelectorAll('.pj-hero, .pj-hero *, .tabs-wrap, .panels')].filter((e) => !e.closest('.hero-links')).map((e) => e.tagName + '.' + [...e.classList].filter((c) => !/^(badge-|pill)/.test(c)).join('.')).filter((v, i, a) => a.indexOf(v) === i).sort().join(' '));
        const rev = await pg.$$eval('#panel-revisions .rev-timeline > li', (els) => ({ n: els.length, lastGoal: els[els.length - 1]?.classList.contains('end-goal'), lastVer: els[els.length - 1]?.querySelector('.ver')?.textContent }));
        if (!rev.lastGoal || rev.lastVer !== 'End goal') fail(`${rel}: last revision item must render as End goal`);
        const key = JSON.stringify({ tabs, heads, props, dom });
        (sig[vn] ||= {})[name] = key;
        const m = await pg.evaluate(() => {
          const cs = (sel, props) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return props.map((p) => s[p]).join('/'); };
          return { h1: cs('h1', ['fontFamily', 'fontSize', 'lineHeight', 'letterSpacing']), badge: cs('.badge', ['fontSize', 'padding', 'borderRadius']), tab: cs('[role=tab]', ['height', 'fontSize', 'padding']), panels: cs('.panels', ['padding', 'borderTopWidth']), lead: cs('.lead', ['fontSize', 'maxWidth']), body: cs('body', ['fontFamily', 'fontSize']) };
        });
        (metrics[vn] ||= {})[name] = JSON.stringify(m);
        if (shots) for (const s of S.sections) {
          await pg.evaluate((id) => { location.hash = id; }, s.id); await pg.waitForTimeout(80);
          await pg.screenshot({ path: path.join(shots, `${name}__${s.id}__${vn}.png`), fullPage: true });
        }
      } else {
        if (isClass) { (metrics[vn + '-class'] ||= {})[name] = await pg.evaluate(() => ['h1', '.badge', '.panels', '.panel h2', '.lead'].map((s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontSize + '/' + getComputedStyle(e).padding : ''; }).join('|')); }
        if (shots) await pg.screenshot({ path: path.join(shots, `${name}__${vn}.png`), fullPage: true });
      }
      await pg.close();
    }
    await ctx.close();
  }
  // home page nav at both widths (screenshots only; the page is not modified by this check)
  for (const [vn, w, h] of VIEWS) {
    const ctx = await br.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: vn === '390' ? 2 : 1, isMobile: vn === '390' });
    await ctx.route(/googletagmanager|googleapis|gstatic/, (r) => r.abort());
    const pg = await ctx.newPage(); await pg.goto(pathToFileURL(path.join(ROOT, 'index.html')).href); await pg.waitForTimeout(400);
    const ow = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (ow > 1) fail(`index.html @${vn}: horizontal overflow ${ow}px`);
    if (shots) {
      await pg.screenshot({ path: path.join(shots, `home-top__${vn}.png`) });
      await pg.evaluate(() => document.getElementById('projects').scrollIntoView()); await pg.waitForTimeout(900);
      await pg.screenshot({ path: path.join(shots, `home-projects__${vn}.png`) });
      await pg.evaluate(() => document.getElementById('education').scrollIntoView()); await pg.waitForTimeout(900);
      await pg.screenshot({ path: path.join(shots, `home-education__${vn}.png`) });
    }
    await ctx.close();
  }
  await br.close();
  const uniform = (map, what) => { for (const vn of Object.keys(map)) { const vals = new Set(Object.values(map[vn])); if (vals.size > 1) { const groups = {}; for (const [n, v] of Object.entries(map[vn])) (groups[v] ||= []).push(n); fail(`${what} differs across pages @${vn}:\n   ` + Object.values(groups).map((g) => g.join(', ')).join('\n   vs ')); } } };
  uniform(sig, 'project page structure'); uniform(metrics, 'computed styles'); uniform(hdr, 'header nav / footer');
  console.log(`render check: ${pages.length} pages x ${VIEWS.length} viewports${shots ? ', screenshots in ' + shots : ''}`);
}
if (process.argv.includes('--render')) await renderCheck();

for (const w of warns) console.log('WARN  ' + w);
if (fails.length) { console.log(`\nFAILED (${fails.length}):`); for (const f of fails) console.log('  ✗ ' + f); process.exit(1); }
console.log('OK: all checks passed');
