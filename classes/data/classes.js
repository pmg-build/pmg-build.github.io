/* ============================================================================
 * CLASS DATA — the only place class pages are defined. Run `node tools/check.mjs` after editing.
 * PUBLIC-SAFETY: titles + course numbers + high-level plans only. NO meeting times, rooms,
 * instructors, syllabus text or course materials. Plans are intentions ("I plan to..."), not claims
 * of completed work. Completed classes with an unknown number use code: ''.
 * ========================================================================== */
window.CLASSES = [
  {
    id: 'python-programming-1', code: '90-812', title: 'Python Programming I', status: 'In progress', term: 'Fall 2026',
    summary: 'Programming fundamentals in Python.',
    apply: {
      summary: 'I plan to use Python to move my prototypes from one-off scripts toward cleaner, testable tools.',
      applications: [
        'Automate data collection and cleaning for my analysis tools.',
        'Write repeatable checks so a prototype can be re-tested after every change.',
        'Prototype backend logic (such as routing) before committing to an interface.'
      ]
    },
    relatedProjects: ['sports-model-trialbet', 'hamburg-wayfinding', 'contractor-quote-workbook']
  },
  {
    id: 'statistical-reasoning', code: '90-711', title: 'Statistical Reasoning', status: 'In progress', term: 'Fall 2026',
    summary: 'Statistical thinking for decisions under uncertainty.',
    apply: {
      summary: 'I plan to use statistical reasoning to judge my own products honestly, with evidence rather than intuition.',
      applications: [
        'Evaluate models with out-of-sample tests, and report when the market or baseline wins.',
        'Separate correlation from cause when interpreting results from a pilot or user test.',
        'Size and design small user tests before building more features.'
      ]
    },
    relatedProjects: ['sports-model-trialbet', 'study-reels']
  },
  {
    id: 'intro-information-security', code: '95-752', title: 'Introduction to Information Security', status: 'In progress', term: 'Fall 2026',
    summary: 'Foundations of information security.',
    apply: {
      summary: 'I plan to apply security and GRC thinking to my products from the first design step, not after launch.',
      applications: [
        'Threat-model each product early and keep a short risk register next to its documentation.',
        'Minimize the data a product collects, and gate any sensitive integration behind review.',
        'Map each product to recognized frameworks honestly, as aligned, considered or planned, never as certified.'
      ]
    },
    relatedProjects: ['hamburg-wayfinding', 'bloom', 'linux-resource-monitor']
  },
  {
    id: 'managing-disruptive-technologies', code: '95-723', title: 'Managing Disruptive Technologies', status: 'In progress', term: 'Fall 2026',
    summary: 'How new technologies reshape markets and organizations.',
    apply: {
      summary: 'I plan to use it to decide which product ideas deserve more investment and which should be shelved.',
      applications: [
        'Test the assumptions behind an idea early, and be ready for a no-go decision.',
        'Think about adoption and the incumbent alternatives before building.',
        'Position new AI-assisted tools around real needs, not novelty.'
      ]
    },
    relatedProjects: ['bloom', 'wireless-power-mini-kit', 'study-reels']
  },
  {
    id: 'ispm-professional-seminar', code: '95-740', title: 'ISPM Professional Seminar', status: 'In progress', term: 'Fall 2026',
    summary: 'Professional development for information security policy and management.',
    apply: {
      summary: 'I plan to use it to get better at explaining risk and my work to non-technical audiences.',
      applications: [
        'Keep project write-ups clear enough for a hiring manager or client to follow.',
        'Practice presenting trade-offs and limits honestly.',
        'Build professional relationships that inform what I build next.'
      ]
    },
    relatedProjects: []
  },
  {
    id: 'management-consulting', code: '94-808', title: 'Management Consulting', status: 'In progress', term: 'Fall 2026',
    summary: 'Structured problem solving and client-ready deliverables.',
    apply: {
      summary: 'I plan to use consulting methods to shape how I scope, propose and document work for others.',
      applications: [
        'Frame a problem, audience and objectives before proposing a solution.',
        'Package work as a proposal, an estimate and documentation that a client can review.',
        'Run structured go/no-go reviews on my own product ideas.'
      ]
    },
    relatedProjects: ['contractor-quote-workbook', 'wireless-power-mini-kit']
  },
  {
    id: 'economics', code: '', title: 'Economics', status: 'Completed', term: '',
    summary: 'Economic analysis for decisions.',
    apply: {
      summary: 'I use economic reasoning to check whether a product idea can pay for itself before building it.',
      applications: [
        'Compare price against the full cost of delivering a product, including fees and returns.',
        'Think in terms of incentives and trade-offs when choosing features and pricing.',
        'Record the result honestly, including when the numbers say no.'
      ]
    },
    relatedProjects: ['wireless-power-mini-kit', 'contractor-quote-workbook']
  }
];
