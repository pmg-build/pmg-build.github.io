/* Class index + class page. One template each, driven by classes/data/classes.js. */
(function () {
  'use strict';
  var P = window.PORTFOLIO, esc = P.esc, body = document.body;
  var root = body.getAttribute('data-root') || '';
  var STATUSES = ['In progress', 'Completed'];
  var GLYPH = { 'in-progress': '◐', 'completed': '✓' };
  var contact = window.SITE.contact;

  function badge(s) { var k = P.slugStatus(s); return '<span class="badge badge-' + k + '"><span aria-hidden="true">' + GLYPH[k] + '</span> ' + esc(s) + '</span>'; }
  function codeLine(c) { return c.code ? '<span class="class-code">' + esc(c.code) + '</span>' : ''; }
  function card(c) {
    var href = root + 'classes/' + encodeURIComponent(c.id) + '/';
    return '<article class="card project-card" data-status="' + esc(c.status) + '"><div class="project-card-top">' + badge(c.status) +
      (c.term ? '<span class="updated">' + esc(c.term) + '</span>' : '') + '</div>' +
      codeLine(c) + '<h3><a href="' + href + '">' + esc(c.title) + '</a></h3>' +
      '<p class="project-summary">' + esc(c.apply.summary) + '</p><a class="card-link" href="' + href + '">How I plan to apply it <span aria-hidden="true">→</span></a></article>';
  }

  var page = body.getAttribute('data-page');
  if (page === 'classes') {
    var grid = document.getElementById('project-grid'), filters = document.getElementById('project-filters'), count = document.getElementById('project-count');
    var current = 'All';
    function draw() {
      var list = window.CLASSES.filter(function (c) { return current === 'All' || c.status === current; });
      grid.innerHTML = list.map(card).join('');
      count.textContent = 'Showing ' + list.length + ' of ' + window.CLASSES.length + ' classes' + (current === 'All' ? '' : ' · ' + current);
      Array.prototype.forEach.call(filters.querySelectorAll('button'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-status') === current)); });
    }
    filters.innerHTML = ['All'].concat(STATUSES).map(function (s) {
      var n = s === 'All' ? window.CLASSES.length : window.CLASSES.filter(function (c) { return c.status === s; }).length;
      return '<button type="button" class="chip" data-status="' + esc(s) + '" aria-pressed="false">' + esc(s) + ' <span class="chip-n">' + n + '</span></button>';
    }).join('');
    filters.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { current = b.getAttribute('data-status'); draw(); } });
    draw();
    return;
  }

  var id = body.getAttribute('data-class');
  var c = window.CLASSES.filter(function (x) { return x.id === id; })[0];
  var mount = document.getElementById('class-root');
  if (!c) { mount.innerHTML = '<section class="pj-hero"><div class="container"><h1>Class not found</h1></div></section>'; return; }
  document.title = c.title + ' | Preet Desai';
  function block(t, inner) { return '<div class="block"><h3>' + t + '</h3>' + inner + '</div>'; }
  var rel = c.relatedProjects.map(function (pid) {
    var p = window.PROJECTS.filter(function (x) { return x.id === pid; })[0];
    return p ? '<li><a href="' + root + 'projects/' + encodeURIComponent(p.id) + '/">' + esc(p.title) + '</a> ' + P.statusBadge(p.status) + '</li>' : '';
  }).join('');
  var href = contact.email ? 'mailto:' + contact.email : root + contact.schedule;
  mount.innerHTML =
    '<section class="pj-hero"><div class="container"><a class="back" href="' + root + 'classes/"><span aria-hidden="true">←</span> All classes</a>' +
    '<p class="section-label">Class</p><h1>' + esc(c.title) + '</h1><p class="headline">' + esc(c.summary) + '</p>' +
    '<div class="meta-row">' + badge(c.status) + codeLine(c) + (c.term ? '<span class="pill">' + esc(c.term) + '</span>' : '') + '</div></div></section>' +
    '<section class="pj-body"><div class="container"><div class="panels card"><div class="panel">' +
    '<div class="panel-head"><h2>How I plan to apply it</h2></div><p class="lead">' + esc(c.apply.summary) + '</p>' +
    block('Where it shows up in my work', '<ul>' + c.apply.applications.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>') +
    block('Related projects', rel ? '<ul class="related">' + rel + '</ul>' : '<p>None yet. This class feeds my general approach rather than one project.</p>') +
    '<p class="fineprint">High-level plans only. They describe how I intend to use the class, not course content.</p>' +
    '<div class="request"><div><strong>Work with me</strong><span>Interested in how this applies to your problem? Let’s talk.</span></div><a class="btn btn-primary" href="' + esc(href) + '">' + (contact.email ? 'Email me' : 'Book a call') + '</a></div>' +
    '</div></div></div></section>';
})();
