// Generates every Projects/Classes page shell from ONE template per page type, using the same
// head, header, nav and footer as the rest of the site. Run: node tools/make-pages.mjs
// tools/check.mjs verifies the files on disk match this output exactly (so pages cannot drift).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function loadData() {
  const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
  for (const f of ['projects/js/common.js', 'projects/data/projects.js', 'classes/data/classes.js'])
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  return { PORTFOLIO: ctx.window.PORTFOLIO || ctx.PORTFOLIO, PROJECTS: ctx.window.PROJECTS, SITE: ctx.window.SITE, CLASSES: ctx.window.CLASSES };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const GA = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-N8KJZ7MTZ8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-N8KJZ7MTZ8');
  </script>`;

// Same nav as index.html (plus "Classes"; Projects points at the full list); only the prefix changes.
const NAV = [['About', 'index.html#about'], ['Experience', 'index.html#experience'], ['Projects', 'projects/', 'projects'],
  ['Education', 'index.html#education'], ['Classes', 'classes/', 'classes'],
  ['Skills', 'index.html#skills'], ['Life', 'index.html#life'], ['Contact', 'index.html#contact'], ['Schedule', 'schedule.html']];

const header = (root, current) => `  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="${root}index.html">Preet Desai</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Primary">
        <ul class="nav-links">
${NAV.map(([l, h, k]) => `          <li><a href="${root}${h}"${k && k === current ? ' aria-current="page"' : ''}>${l}</a></li>`).join('\n')}
        </ul>
        <a class="btn btn-small" href="${root}resume.html">Resume</a>
      </nav>
    </div>
  </header>`;

const footer = (root) => `  <footer class="footer">
    <div class="container footer-row">
      <p>© <span id="year"></span> Preet Desai · <a href="https://preet-desai.me">preet-desai.me</a></p>
      <p>
        <a href="${root}index.html">Home</a>
        <a href="${root}projects/">Projects</a>
        <a href="${root}classes/">Classes</a>
        <a href="https://www.linkedin.com/in/preet-desai26" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${root}resume.html">Resume</a>
      </p>
    </div>
  </footer>`;

function page({ title, desc, canonical, root, kind, current, attrs, main, scripts }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
${GA}
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="https://preet-desai.me/${canonical}" />
  <meta name="theme-color" content="#F4F1EA" />
  <meta name="robots" content="index,follow" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Preet Desai" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="https://preet-desai.me/${canonical}" />
  <meta property="og:image" content="https://preet-desai.me/assets/og-image.png" />
  <link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${root}styles.css" />
  <link rel="stylesheet" href="${root}projects/css/projects.css" />
</head>
<body class="pj-page" data-page="${kind}" data-root="${root}"${attrs}>
  <a class="skip-link" href="#main">Skip to content</a>

${header(root, current)}

  <main id="main">
${main}
  </main>

${footer(root)}

${scripts.map((s) => `  <script src="${root}${s}"></script>`).join('\n')}
</body>
</html>
`;
}

const PRJ_JS = ['projects/js/common.js', 'projects/data/projects.js'];
const filterMain = (eyebrow, h1, lead, extra) => `    <section class="pj-hero">
      <div class="container">
        <p class="section-label">${eyebrow}</p>
        <h1>${h1}</h1>
        <p class="headline">${lead}</p>
      </div>
    </section>
    <section class="pj-body">
      <div class="container">
        <div class="filter-bar">
          <div id="project-filters" class="chips" role="group" aria-label="Filter by status"></div>
          <p id="project-count" class="count" aria-live="polite"></p>
        </div>
        <div id="project-grid" class="project-grid"></div>
        <noscript><p>This page needs JavaScript to list items.</p></noscript>
${extra}
      </div>
    </section>`;

export const projectsIndex = () => page({
  title: 'Projects — Preet Desai', desc: 'Projects by Preet Desai: practical tools with status, results and summaries of pricing, documentation, security and revision history.',
  canonical: 'projects/', root: '../', kind: 'projects', current: 'projects', attrs: '',
  main: filterMain('Projects', 'What I’m building', 'Practical tools in various stages, from concept to prototype. Each project page covers the proposal and results, with summaries of pricing, documentation, security and revision history. Detail is shared on request.', '        <div class="request" data-work-with-me></div>'),
  scripts: [...PRJ_JS, 'projects/js/projects-ui.js']
});

export const projectPage = (p) => page({
  title: `${esc(p.title)} — Preet Desai`, desc: esc(p.summary), canonical: `projects/${p.id}/`, root: '../../', kind: 'project', current: 'projects',
  attrs: ` data-project="${p.id}"`,
  main: `    <div id="project-root"><noscript><div class="container"><p>This page needs JavaScript to display project details.</p></div></noscript></div>`,
  scripts: [...PRJ_JS, 'projects/js/projects-ui.js', 'projects/js/project-page.js']
});

export const classesIndex = () => page({
  title: 'Classes — Preet Desai', desc: 'Current and completed classes at CMU Heinz, and how Preet Desai plans to apply each one to his products and business models.',
  canonical: 'classes/', root: '../', kind: 'classes', current: 'classes', attrs: '',
  main: filterMain('Classes', 'What I’m studying, and how I’ll use it', 'Current and completed classes, each with a high-level view of how I plan to apply it to my products and business models.', ''),
  scripts: [...PRJ_JS, 'projects/js/projects-ui.js', 'classes/data/classes.js', 'classes/js/classes.js']
});

export const classPage = (c) => page({
  title: `${esc(c.title)} — Preet Desai`, desc: esc(c.apply.summary), canonical: `classes/${c.id}/`, root: '../../', kind: 'class', current: 'classes',
  attrs: ` data-class="${c.id}"`,
  main: `    <div id="class-root"><noscript><div class="container"><p>This page needs JavaScript to display class details.</p></div></noscript></div>`,
  scripts: [...PRJ_JS, 'projects/js/projects-ui.js', 'classes/data/classes.js', 'classes/js/classes.js']
});

export function expectedFiles({ PROJECTS, CLASSES }) {
  const out = { 'projects/index.html': projectsIndex(), 'classes/index.html': classesIndex() };
  for (const p of PROJECTS) out[`projects/${p.id}/index.html`] = projectPage(p);
  for (const c of CLASSES) out[`classes/${c.id}/index.html`] = classPage(c);
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const data = loadData();
  for (const [rel, txt] of Object.entries(expectedFiles(data))) {
    const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, txt); console.log('wrote', rel);
  }
  for (const [dir, list] of [['projects', data.PROJECTS], ['classes', data.CLASSES]])
    for (const d of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }))
      if (d.isDirectory() && !['css', 'js', 'data'].includes(d.name) && !list.some((x) => x.id === d.name)) { fs.rmSync(path.join(ROOT, dir, d.name), { recursive: true }); console.log('removed stale', dir + '/' + d.name); }
}
