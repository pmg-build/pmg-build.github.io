/* THE project page template. Every project renders through this one function, so structure,
 * section order, badges, date format and version labels are identical across projects. */
(function () {
  'use strict';
  var P = window.PORTFOLIO, S = P.SCHEMA, esc = P.esc, fmt = P.fmtDate;
  var body = document.body, root = body.getAttribute('data-root') || '';
  var id = body.getAttribute('data-project') || (/[?&]id=([^&]+)/.exec(location.search) || [])[1];
  var mount = document.getElementById('project-root');
  var project = window.PROJECTS.filter(function (p) { return p.id === id; })[0];

  if (!project) {
    mount.innerHTML = '<section class="pj-hero"><div class="container"><h1>Project not found</h1><p class="headline">Try the <a href="' + root + 'projects/">projects list</a>.</p></div></section>';
    return;
  }
  document.title = project.title + ' | Preet Desai';
  var contact = window.SITE.contact;

  function list(items, cls) { return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>'; }
  function block(title, inner) { return '<div class="block"><h3>' + title + '</h3>' + inner + '</div>'; }
  function pill(text, cls) { return '<span class="pill ' + (cls || '') + '">' + esc(text) + '</span>'; }
  function visChip(v) {
    var t = { 'public': 'Public detail', 'summary': 'Summary view', 'private': 'Available on request' }[v];
    return '<span class="vis vis-' + v + '">' + t + '</span>';
  }
  function head(section, v) {
    return '<div class="panel-head"><h2>' + esc(section.label) + '</h2>' + (section.flag ? visChip(v) : '') + '</div>';
  }
  function requestBox(what) {
    var href = contact.email ? 'mailto:' + contact.email + '?subject=' + encodeURIComponent('Details: ' + project.title) : root + contact.schedule;
    var ext = '';
    return '<div class="request"><div><strong>Want the detail?</strong><span>' + esc(what) + ' shared on request.</span>' +
      (contact.email || !contact.showEmailPlaceholder ? '' : '<span class="placeholder-note">Email: <mark>' + esc(contact.emailPlaceholder) + '</mark> (placeholder, set in data/projects.js)</span>') +
      '</div><a class="btn btn-primary" href="' + esc(href) + '"' + ext + '>' + (contact.email ? 'Request details' : 'Book a call to request details') + '</a></div>';
  }
  function frameworks(list_) {
    return block('Frameworks', '<ul class="fw-list">' + list_.map(function (f) {
      return '<li><span class="fw-name">' + esc(f.name) + '</span><span class="level level-' + f.level + '">' + esc(f.level.replace('-', ' ')) + '</span>' +
        (f.note ? '<span class="fw-note">' + esc(f.note) + '</span>' : '') + '</li>';
    }).join('') + '</ul><p class="fineprint">Levels describe design intent only (aligned / considered / planned). Nothing here is a certification or attestation.</p>');
  }

  var renderers = {
    proposal: function (p) {
      var pr = p.proposal;
      return head(S.sections[0]) +
        '<div class="two-col">' + block('Problem', '<p>' + esc(pr.problem) + '</p>') + block('Audience', '<p>' + esc(pr.audience) + '</p>') + '</div>' +
        block('Approach', '<p>' + esc(pr.approach) + '</p>') +
        block('Results so far', list(pr.results, 'results')) +
        '<div class="two-col">' + block('Objectives', list(pr.objectives)) + block('Methodology (summary)', '<ol>' + pr.methodology.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ol>') + '</div>' +
        block('Timeline', '<ol class="phases">' + pr.timeline.map(function (t) {
          return '<li><span class="phase-name">' + esc(t.phase) + '</span><span class="phase-when">' + esc(t.window) + '</span>' + pill(t.status, 'st-' + P.slugStatus(t.status)) + '</li>';
        }).join('') + '</ol>');
    },
    pricing: function (p) {
      var s = p.pricing, v = P.vis(p, 'pricing');
      var out = head(S.sections[1], v) + '<p class="lead">' + esc(s.summary) + '</p>' + '<p>' + pill(s.basis, 'basis') + '</p>';
      if (v === 'private') return out + requestBox('Pricing and figures are');
      out += list(s.highlights, 'highlights');
      if (v === 'public' && s.detail) {
        out += block('Detail', '<div class="grid-3">' + s.detail.tiers.map(function (t) {
          return '<div class="tier"><h4>' + esc(t.name) + '</h4><div class="price">' + esc(t.price) + '</div><p>' + esc(t.blurb) + '</p></div>';
        }).join('') + '</div>' + (s.detail.note ? '<p class="fineprint">' + esc(s.detail.note) + '</p>' : ''));
        return out;
      }
      return out + requestBox('Detailed pricing and figures are');
    },
    docs: function (p) {
      var s = p.docs, v = P.vis(p, 'docs');
      var out = head(S.sections[2], v) + '<p class="lead">' + esc(s.summary) + '</p>';
      if (v === 'private') return out + requestBox('Documents are');
      out += '<ul class="doc-list">' + s.items.map(function (d) {
        var t = (v === 'public' && d.href) ? '<a href="' + esc(d.href) + '">' + esc(d.title) + '</a>' : esc(d.title);
        return '<li><span class="doc-type">' + esc(d.type) + '</span><span class="doc-title">' + t + (v === 'public' && d.desc ? '<small>' + esc(d.desc) + '</small>' : '') + '</span>' + pill(d.status, 'doc-' + P.slugStatus(d.status)) + '</li>';
      }).join('') + '</ul>';
      return v === 'public' ? out : out + requestBox('Documents are');
    },
    security: function (p) {
      var s = p.security, v = P.vis(p, 'security');
      var out = head(S.sections[3], v) + '<p class="lead">' + esc(s.summary) + '</p>';
      if (v === 'private') return out + requestBox('Security notes are');
      out += list(s.highlights, 'highlights') + frameworks(s.frameworks);
      if (v === 'public' && s.detail) {
        out += block('Data handling', '<dl class="dh">' + s.detail.dataHandling.map(function (d) { return '<dt>' + esc(d.area) + '</dt><dd>' + esc(d.text) + '</dd>'; }).join('') + '</dl>');
        return out;
      }
      return out + requestBox('Security notes and policies are');
    },
    revisions: function (p) {
      var s = p.revisions, v = P.vis(p, 'revisions');
      var out = head(S.sections[4], v) + '<p class="lead">' + esc(s.summary) + '</p>';
      if (v === 'private') return out + requestBox('The full revision log is');
      out += '<ol class="rev-timeline">' + s.items.map(function (r) {
        var goal = r.version === S.endGoalLabel;
        return '<li class="' + (goal ? 'end-goal ' : '') + 'st-' + P.slugStatus(r.status) + '">' +
          '<div class="tl-head"><span class="ver">' + esc(r.version) + '</span>' + pill(r.status, 'st-' + P.slugStatus(r.status)) +
          '<time datetime="' + r.date + '">' + (r.dateType === 'target' ? 'Target · ' : '') + fmt(r.date) + '</time></div>' +
          '<p class="tl-title">' + esc(r.title) + '</p>' +
          (v === 'public' && r.notes ? list(r.notes, 'tl-notes') : '') + '</li>';
      }).join('') + '</ol>';
      return out + '<p class="fineprint">Target dates are plans, not commitments.</p>' + (v === 'public' ? '' : requestBox('Per-revision change notes are'));
    }
  };

  var tabs = S.sections.map(function (s) {
    return '<button type="button" role="tab" id="tab-' + s.id + '" aria-controls="panel-' + s.id + '" aria-selected="false" tabindex="-1" data-id="' + s.id + '">' + esc(s.label) + '</button>';
  }).join('');
  var panels = S.sections.map(function (s) {
    return '<div role="tabpanel" class="panel" id="panel-' + s.id + '" aria-labelledby="tab-' + s.id + '" tabindex="0" hidden>' + renderers[s.id](project) + '</div>';
  }).join('');

  // Optional media (screenshots and one short code snippet). Rendered after the tabs, outside the
  // hero/tabs/panels structure, so projects without media are unchanged.
  function renderMedia(m) {
    if (!m || !((m.images && m.images.length) || m.code)) return '';
    var imgs = (m.images || []).map(function (im) {
      return '<figure class="pj-shot"><a href="' + esc(root + im.src) + '"><img src="' + esc(root + im.src) + '" alt="' + esc(im.alt) + '" loading="lazy"></a>' +
        (im.caption ? '<figcaption>' + esc(im.caption) + '</figcaption>' : '') + '</figure>';
    }).join('');
    var code = m.code ? '<figure class="pj-code"><pre><code>' + esc(m.code.text) + '</code></pre>' +
      (m.code.caption ? '<figcaption>' + esc(m.code.caption) + '</figcaption>' : '') + '</figure>' : '';
    return '<section class="pj-media"><div class="container"><p class="section-label">' + esc(m.label || 'Media') + '</p>' +
      (m.note ? '<p class="fineprint">' + esc(m.note) + '</p>' : '') +
      (imgs ? '<div class="pj-shots">' + imgs + '</div>' : '') + code + '</div></section>';
  }

  mount.innerHTML =
    '<section class="pj-hero"><div class="container">' +
    '<a class="back" href="' + root + 'projects/"><span aria-hidden="true">←</span> All projects</a>' +
    '<p class="section-label">Project</p><h1>' + esc(project.title) + '</h1>' +
    '<p class="headline">' + esc(project.summary) + '</p>' +
    '<div class="meta-row">' + P.statusBadge(project.status) + '<span class="pill">Updated ' + fmt(project.updated) + '</span>' +
    project.tags.map(function (t) { return '<span class="pill">' + esc(t) + '</span>'; }).join('') + '</div>' +
    (project.links && project.links.length ? '<p class="hero-links">' + project.links.map(function (l) { return '<a class="btn btn-small" href="' + esc(root + l.href) + '">' + esc(l.label) + '</a>'; }).join(' ') + '</p>' : '') + '</div></section>' +
    '<section class="pj-body"><div class="container"><div class="tabs-wrap"><div class="tabs" role="tablist" aria-label="Project sections">' + tabs + '</div></div>' +
    '<div class="panels card">' + panels + '</div></div></section>' + renderMedia(project.media);

  var tabEls = Array.prototype.slice.call(mount.querySelectorAll('[role=tab]'));
  function select(sid, focus, push) {
    if (!S.sections.some(function (s) { return s.id === sid; })) sid = S.sections[0].id;
    tabEls.forEach(function (t) {
      var on = t.getAttribute('data-id') === sid;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      document.getElementById('panel-' + t.getAttribute('data-id')).hidden = !on;
      if (on && focus) t.focus();
    });
    if (push) { try { history.replaceState(null, '', '#' + sid); } catch (e) {} }
  }
  tabEls.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t.getAttribute('data-id'), false, true); });
    t.addEventListener('keydown', function (e) {
      var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabEls.length - 1 : null;
      if (j === null) return; e.preventDefault();
      select(tabEls[(j + tabEls.length) % tabEls.length].getAttribute('data-id'), true, true);
    });
  });
  window.addEventListener('hashchange', function () { select(location.hash.slice(1), false, false); });
  select(location.hash.slice(1), false, false);
})();
