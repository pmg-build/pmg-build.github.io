/* Shared schema + helpers (classic script: works on file:// and any static host).
 * Loaded by the renderer AND by tools/check.mjs, so page and validator can never disagree. */
(function (root) {
  'use strict';

  var SCHEMA = {
    // Fixed section order for EVERY project page. Never reorder per project.
    sections: [
      { id: 'proposal',  label: 'Proposal',               flag: false },
      { id: 'pricing',   label: 'Pricing',                flag: true },
      { id: 'docs',      label: 'Documentation',          flag: true },
      { id: 'security',  label: 'Security & Frameworks',  flag: true },
      { id: 'revisions', label: 'Revision history',       flag: true }
    ],
    // Per-section visibility. Default 'summary'.
    //  public  : full `detail` is rendered (only use for things you are happy to publish)
    //  summary : general summary + short highlights only (no detail is allowed in the data file)
    //  private : "Available on request" panel (summary sentence only)
    visibility: ['public', 'summary', 'private'],
    defaultVisibility: 'summary',
    statuses: ['Prototype', 'In progress', 'Concept'],
    docTypes: ['SOP', 'BOM', 'Guide', 'Report', 'Demo', 'Workbook', 'Spec', 'Checklist'],
    docStatuses: ['On request', 'Draft', 'Planned', 'Public'],
    pricingBasis: ['Illustrative', 'Internal analysis', 'Not set'],
    frameworkLevels: ['aligned', 'considered', 'planned', 'not-applicable'], // never "certified"
    requiredFrameworks: ['NIST CSF', 'OWASP', 'ISO/IEC 27001', 'SOC 2'],
    revisionStatuses: ['Done', 'In progress', 'Planned', 'Goal'],
    timelineStatuses: ['Done', 'In progress', 'Planned'],
    versionPattern: '^v\\d+\\.\\d+$',
    endGoalLabel: 'End goal',
    proposalFields: ['problem', 'audience', 'approach', 'results', 'objectives', 'methodology', 'timeline']
  };

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // One date format everywhere: "Oct 24, 2026". Input: ISO yyyy-mm-dd.
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] : '';
  }
  function slugStatus(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-'); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function isIsoDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return false;
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
  }
  function vis(project, sectionId) {
    var s = project && project[sectionId];
    return (s && s.visibility) || SCHEMA.defaultVisibility;
  }

  root.PORTFOLIO = { SCHEMA: SCHEMA, fmtDate: fmtDate, slugStatus: slugStatus, esc: esc, isIsoDate: isIsoDate, vis: vis };
})(typeof window !== 'undefined' ? window : globalThis);
