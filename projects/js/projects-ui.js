/* Project cards: used by projects/ (grid + status filter) and the home-page teaser. */
(function () {
  'use strict';
  var P = window.PORTFOLIO, S = P.SCHEMA, esc = P.esc;
  var root = document.body.getAttribute('data-root') || '';

  function sorted() {
    return window.PROJECTS.slice().sort(function (a, b) {
      return a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : a.title.localeCompare(b.title);
    });
  }
  var GLYPH = { 'prototype': '●', 'in-progress': '◐', 'concept': '○' };
  function badge(status) {
    var k = P.slugStatus(status);
    return '<span class="badge badge-' + k + '"><span aria-hidden="true">' + GLYPH[k] + '</span> ' + esc(status) + '</span>';
  }
  function card(p) {
    var href = root + 'projects/' + encodeURIComponent(p.id) + '/';
    return '<article class="card project-card" data-status="' + esc(p.status) + '">' +
      '<div class="project-card-top">' + badge(p.status) + '<span class="updated">Updated ' + P.fmtDate(p.updated) + '</span></div>' +
      '<h3><a href="' + href + '">' + esc(p.title) + '</a></h3>' +
      '<p class="project-summary">' + esc(p.summary) + '</p>' +
      '<div class="tag-row">' + p.tags.map(function (t) { return '<span class="skill">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<a class="card-link" href="' + href + '">View project <span aria-hidden="true">→</span></a></article>';
  }
  window.PORTFOLIO.projectCard = card;
  window.PORTFOLIO.statusBadge = badge;

  var teaser = document.getElementById('project-teaser');
  if (teaser) teaser.innerHTML = sorted().slice(0, +teaser.getAttribute('data-limit') || 3).map(card).join('');

  var grid = document.getElementById('project-grid');
  if (!grid || document.body.getAttribute('data-page') !== 'projects') return;
  var filters = document.getElementById('project-filters'), count = document.getElementById('project-count');
  var current = 'All';
  var q = /[?&]status=([^&]+)/.exec(location.search);
  if (q && S.statuses.indexOf(decodeURIComponent(q[1])) > -1) current = decodeURIComponent(q[1]);

  function draw() {
    var list = sorted().filter(function (p) { return current === 'All' || p.status === current; });
    grid.innerHTML = list.map(card).join('');
    count.textContent = 'Showing ' + list.length + ' of ' + window.PROJECTS.length + ' projects' + (current === 'All' ? '' : ' · ' + current);
    Array.prototype.forEach.call(filters.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-status') === current));
    });
  }
  filters.innerHTML = ['All'].concat(S.statuses).map(function (s) {
    var n = s === 'All' ? window.PROJECTS.length : window.PROJECTS.filter(function (p) { return p.status === s; }).length;
    return '<button type="button" class="chip" data-status="' + esc(s) + '" aria-pressed="false">' + esc(s) + ' <span class="chip-n">' + n + '</span></button>';
  }).join('');
  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    current = b.getAttribute('data-status'); draw();
    try { history.replaceState(null, '', current === 'All' ? location.pathname : '?status=' + encodeURIComponent(current)); } catch (x) {}
  });
  draw();
})();

/* "Work with me" call-to-action (projects index + home teaser). Email is a clearly-marked placeholder until set. */
(function () {
  'use strict';
  var P = window.PORTFOLIO, esc = P.esc, c = window.SITE.contact, root = document.body.getAttribute('data-root') || '';
  Array.prototype.forEach.call(document.querySelectorAll('[data-work-with-me]'), function (el) {
    var href = c.email ? 'mailto:' + c.email + '?subject=' + encodeURIComponent('Working together') : root + c.schedule;
    el.innerHTML = '<div><strong>Work with me</strong><span>Need a practical tool, a quoting workbook, or a documentation pack? Let’s talk.</span>' +
      (c.email || !c.showEmailPlaceholder ? '' : '<span class="placeholder-note">Email: <mark>' + esc(c.emailPlaceholder) + '</mark> (placeholder, set in data/projects.js)</span>') +
      '</div><a class="btn btn-primary" href="' + esc(href) + '"' + (c.email ? '' : ' target="_blank" rel="noopener noreferrer"') + '>Work with me</a>';
  });
})();
