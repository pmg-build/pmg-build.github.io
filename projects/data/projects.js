/* ============================================================================
 * PROJECT DATA — the ONLY place project content lives. Edit here to add/change projects.
 * Pages (projects/ grid, projects/<slug>/, home teaser) are all generated from this file
 * by the same templates, so they cannot drift. Run `node tools/check.mjs` after every edit.
 *
 * PUBLIC-SAFETY RULES (this file is served to everyone who visits the site):
 *  - High level only: problem, approach summary, status, results.
 *  - NO full BOMs, supplier URLs, unit costs/margins, detailed pricing, internal SOP steps,
 *    security-control details, source-code links, or IP/trade-secret specifics.
 *  - NO client names or confidential data. CONFIRM CONFIDENTIALITY BEFORE PUBLISHING CLIENT WORK
 *    (flip SITE.confidentialityConfirmed to true once you have).
 *  - Security frameworks: only "aligned" / "considered" / "planned" / "not-applicable". NEVER "certified".
 *
 * SECTION VISIBILITY (per project, per section; default "summary"):
 *   "public"  – the section's `detail` block is rendered (only add `detail` when you want it public)
 *   "summary" – general summary + short highlights only (a `detail` block is NOT allowed here)
 *   "private" – shows "Available on request" with the summary sentence only
 * check.mjs fails if a non-public section contains detail (notes, links, tiers, ...).
 *
 * Dates are ISO (yyyy-mm-dd) and displayed as "Oct 24, 2026". Revision dateType:
 * "actual" or "target" (target dates are PLACEHOLDERS — adjust to your real plans).
 * ========================================================================== */
window.SITE = {
  confidentialityConfirmed: false,
  contact: {
    schedule: 'schedule.html',       // existing Calendly page on this site (real)
    linkedin: 'https://www.linkedin.com/in/preet-desai26',
    email: 'preetd2026@gmail.com',
    emailPlaceholder: 'add your email',
    showEmailPlaceholder: false
  }
};

window.PROJECTS = [
  {
    id: 'hamburg-wayfinding',
    title: 'Hamburg Hall wayfinding app',
    status: 'Prototype',
    updated: '2026-10-23',
    summary: 'Helps CMU students find their classrooms in Hamburg Hall, with room search, a class schedule and an “I’m here” starting point.',
    tags: ['Wayfinding', 'Web app', 'CMU'],
    proposal: {
      problem: 'Hamburg Hall spans several wings and its room numbers do not tell you where a room sits, so finding a classroom can be slow and stressful, especially early in the semester.',
      audience: 'CMU students (and visitors) who attend classes in Hamburg Hall.',
      approach: 'Turn the architectural floor plans into a searchable room index, compute routes between rooms, and wrap it in a mobile-friendly app with a personal class schedule.',
      results: [
        'Working prototype: routing across floors 1–2 built from the architectural plans, a class schedule, and an “I’m here” starting point.',
        'Not yet tested with students. The 360° tour and Stellic integration are planned, not built.'
      ],
      objectives: [
        'Get from “I’m here” to any floor 1–2 classroom with clear directions.',
        'Show a student’s day of classes in one view.',
        'Validate with real students before adding features.'
      ],
      methodology: [
        'Index room labels and positions from the floor plans.',
        'Build a route model over the indexed rooms.',
        'Wrap it in a mobile-first interface and test with students.'
      ],
      timeline: [
        { phase: 'Prototype (floors 1–2, schedule, “I’m here”)', window: 'Oct 2026', status: 'Done' },
        { phase: 'Student testing and fixes', window: 'Nov 2026 (target)', status: 'Planned' },
        { phase: '360° tour', window: 'Dec 2026 (target)', status: 'Planned' },
        { phase: 'Stellic integration (needs CMU approval)', window: 'Early 2027 (target)', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Not set',
      summary: 'Intended as a free tool for students. No commercial pricing has been defined.',
      highlights: ['Student use: free (intent).', 'Any institutional offering would be scoped separately.']
    },
    docs: {
      visibility: 'summary',
      summary: 'Documentation is at an early stage. Available on request; a full user guide and test plan come after student testing.',
      items: [
        { title: 'Room index and routing notes', type: 'Spec', status: 'On request' },
        { title: 'Interactive prototype', type: 'Demo', status: 'On request' },
        { title: 'Student user guide', type: 'Guide', status: 'Planned' },
        { title: 'Usability test plan', type: 'Checklist', status: 'Planned' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'The prototype is designed to work without accounts or personal data. A Stellic integration would involve student records, so it needs CMU approval and a privacy review before any work starts.',
      highlights: ['No accounts needed in the current prototype (design intent).', 'Student-record integration is gated on approval and review.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'considered' },
        { name: 'ISO/IEC 27001', level: 'planned' },
        { name: 'SOC 2', level: 'not-applicable' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the first prototype to a tested class-finding tool.',
      items: [
        { version: 'v0.1', date: '2026-10-23', dateType: 'actual', status: 'Done', title: 'Prototype: routing, schedule and “I’m here” for floors 1–2' },
        { version: 'v0.2', date: '2026-11-20', dateType: 'target', status: 'Planned', title: 'Student testing and fixes' },
        { version: 'v0.3', date: '2026-12-18', dateType: 'target', status: 'Planned', title: '360° tour' },
        { version: 'v0.4', date: '2027-02-26', dateType: 'target', status: 'Planned', title: 'Stellic integration (pending approval)' },
        { version: 'End goal', date: '2027-05-14', dateType: 'target', status: 'Goal', title: 'A reliable class-finding tool for Hamburg Hall students' }
      ]
    }
  },

  {
    id: 'wireless-power-mini-kit',
    title: 'Wireless power transfer mini-kit',
    status: 'Concept',
    updated: '2026-10-24',
    summary: 'A documented Arduino-based kit that demonstrates wireless power transfer, with a parts list, procedures and a compliance review.',
    tags: ['Arduino', 'Hardware', 'Documentation'],
    proposal: {
      problem: 'Learners who want to see wireless power transfer in action need a kit that is documented well enough to build repeatably, and a seller needs to know the compliance and economics before committing.',
      audience: 'Students, hobbyists and educators (ages 14+).',
      approach: 'Design an Arduino-based demonstration from off-the-shelf parts, document how to build and check it, review the compliance questions, and test whether it could work as a product.',
      results: [
        'A documentation set is drafted: parts list, build and check procedure, compliance review and an economics analysis.',
        'Finding: at typical Amazon price points, a kit built from retail-priced parts lost money per unit after marketplace costs. It would need bulk sourcing or a different price point to work.',
        'The compliance review flagged wireless-power regulation and trademark use as the main items to resolve.'
      ],
      objectives: [
        'A repeatable, well-documented build.',
        'A clear list of compliance questions to resolve before selling.',
        'An honest go/no-go decision based on the economics.'
      ],
      methodology: [
        'Document the build and the check procedure.',
        'Review regulatory and trademark considerations.',
        'Model the economics and test the assumptions.'
      ],
      timeline: [
        { phase: 'Documentation set and first analysis', window: 'Oct 2026', status: 'Done' },
        { phase: 'Verify assumptions with direct supplier quotes', window: 'Nov 2026 (target)', status: 'Planned' },
        { phase: 'Bench build and test', window: 'Dec 2026 (target)', status: 'Planned' },
        { phase: 'Go / no-go decision', window: 'Early 2027 (target)', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Internal analysis',
      summary: 'An internal analysis was completed. At typical Amazon price points the retail-parts version was not profitable. Detailed figures are available on request.',
      highlights: ['Finding: not viable as-is at marketplace price points.', 'Levers identified: bulk sourcing, packaging, and kit configuration.']
    },
    docs: {
      visibility: 'summary',
      summary: 'A documentation set exists for this concept. Individual documents are available on request.',
      items: [
        { title: 'Bill of materials', type: 'BOM', status: 'On request' },
        { title: 'Build and check procedure', type: 'SOP', status: 'On request' },
        { title: 'Compliance review', type: 'Report', status: 'On request' },
        { title: 'Economics workbook', type: 'Workbook', status: 'On request' },
        { title: 'Assembly guide for learners', type: 'Guide', status: 'Planned' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'A hardware kit with no network features and no user data. The focus is product safety and regulatory compliance rather than cybersecurity controls.',
      highlights: ['No connectivity and no data collection.', 'Regulatory and trademark questions are tracked in the compliance review.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'not-applicable' },
        { name: 'ISO/IEC 27001', level: 'considered' },
        { name: 'SOC 2', level: 'not-applicable' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the documentation set to a go/no-go decision.',
      items: [
        { version: 'v0.1', date: '2026-10-24', dateType: 'actual', status: 'Done', title: 'Documentation set drafted, with first economics and compliance findings' },
        { version: 'v0.2', date: '2026-11-20', dateType: 'target', status: 'Planned', title: 'Assumptions verified with direct supplier quotes' },
        { version: 'v0.3', date: '2026-12-18', dateType: 'target', status: 'Planned', title: 'Bench build and test' },
        { version: 'End goal', date: '2027-02-26', dateType: 'target', status: 'Goal', title: 'Go / no-go decision: sell, publish the instructions, or shelve' }
      ]
    }
  },

  {
    id: 'sports-model-trialbet',
    title: 'Sports prediction model & TrialBet',
    status: 'Prototype',
    updated: '2026-10-24',
    summary: 'A regression model for NFL games and player stats, plus a play-money app for learning how probabilities compare with betting lines.',
    tags: ['Python', 'Regression', 'Education'],
    proposal: {
      problem: 'Beginners meet “predictions” without seeing how a regression turns data into a probability, or how hard it is to beat the betting market.',
      audience: 'Students and curious learners. Educational only: play money, no real-money wagering.',
      approach: 'Build regression models from public NFL data, test them walk-forward against the betting market, and pair them with a play-money app for practice.',
      results: [
        'Walk-forward backtest on the 2024–25 NFL seasons: the betting line was more accurate than our model for game margins and win probabilities. The model beat a naive baseline but not the market.',
        'No evidence that the model finds a profitable edge against the spread. The tool is positioned as a learning aid, not a betting aid.',
        'The play-money app (NFL, NBA and other leagues’ games and odds) is working. The model itself covers the NFL so far; NBA modelling is planned.'
      ],
      objectives: [
        'Teach regression and probability calibration with real data.',
        'Show an honest model-versus-market comparison.',
        'Extend the model to the NBA.'
      ],
      methodology: [
        'Collect public game and player data.',
        'Fit regression models and test them walk-forward by season.',
        'Convert predictions to probabilities and compare them with market prices.'
      ],
      timeline: [
        { phase: 'NFL model and backtest', window: 'Oct 2026', status: 'Done' },
        { phase: 'Play-money app', window: 'Oct 2026', status: 'Done' },
        { phase: 'NBA model and backtest', window: 'Nov 2026 (target)', status: 'Planned' },
        { phase: 'Guided lessons', window: 'Early 2027 (target)', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Not set',
      summary: 'An educational tool intended to be free to use. No pricing has been defined, and there is no real-money wagering.',
      highlights: ['Free educational use (intent).', 'Responsible-gambling messaging is part of the design.']
    },
    docs: {
      visibility: 'summary',
      summary: 'A backtest report and a short usage guide exist. Available on request.',
      items: [
        { title: 'Backtest report', type: 'Report', status: 'On request' },
        { title: 'Play-money app demo', type: 'Demo', status: 'On request' },
        { title: 'Setup and usage guide', type: 'Guide', status: 'Draft' },
        { title: 'Guided lessons', type: 'Guide', status: 'Planned' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'Play money only, with no accounts and no real-money wagering. Settings stay in the user’s own browser.',
      highlights: ['No accounts and no payments.', 'Public data sources only.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'considered' },
        { name: 'ISO/IEC 27001', level: 'considered' },
        { name: 'SOC 2', level: 'not-applicable' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the first model to a teaching tool.',
      items: [
        { version: 'v0.1', date: '2026-10-24', dateType: 'actual', status: 'Done', title: 'First working NFL model and backtest report' },
        { version: 'v0.2', date: '2026-10-24', dateType: 'actual', status: 'Done', title: 'Play-money TrialBet app' },
        { version: 'v0.3', date: '2026-11-27', dateType: 'target', status: 'Planned', title: 'NBA model and backtest' },
        { version: 'v0.4', date: '2027-01-29', dateType: 'target', status: 'Planned', title: 'Guided lessons on regression and calibration' },
        { version: 'End goal', date: '2027-03-31', dateType: 'target', status: 'Goal', title: 'A teaching tool for regression, calibration and why markets are hard to beat' }
      ]
    }
  },

  {
    id: 'study-reels',
    title: 'Study Reels',
    status: 'Prototype',
    updated: '2026-10-23',
    summary: 'A reels-style mobile site for memorizing midterm material: swipe through short cards and tap to flip quizzes.',
    tags: ['Mobile web', 'Education', 'Offline'],
    proposal: {
      problem: 'Reviewing for a midterm usually means rereading notes. Short phone sessions are hard to make productive.',
      audience: 'Students reviewing for exams, starting with a statistics course midterm.',
      approach: 'Break the material into bite-sized cards in a vertical swipe feed, with quiz cards that flip to reveal the answer.',
      results: [
        'A 36-card midterm deck is built and runs offline in a phone browser.',
        'Not yet measured for learning outcomes. Course-material reuse still needs a check before it is shared widely.'
      ],
      objectives: [
        'Make a five-minute review session useful.',
        'Keep it offline-friendly and fast on a phone.',
        'Make new decks easy to produce.'
      ],
      methodology: [
        'Distil each unit into short cards.',
        'Mix explanation cards with flip-to-reveal quizzes.',
        'Self-test and refine.'
      ],
      timeline: [
        { phase: 'Sample feed and midterm deck', window: 'Oct 2026', status: 'Done' },
        { phase: 'Progress tracking and self-test mode', window: 'Nov 2026 (target)', status: 'Planned' },
        { phase: 'Reusable template for other courses', window: 'Dec 2026 (target)', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Not set',
      summary: 'Built for personal study and free to use. No pricing has been defined.',
      highlights: ['Personal study use: free (intent).']
    },
    docs: {
      visibility: 'summary',
      summary: 'Documentation is minimal at this stage. Available on request.',
      items: [
        { title: 'Midterm deck', type: 'Demo', status: 'On request' },
        { title: 'Deck authoring guide', type: 'Guide', status: 'Planned' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'A static page with no accounts and no tracking, designed to work offline.',
      highlights: ['No accounts, no analytics.', 'Course-material reuse to be confirmed before wider sharing.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'considered' },
        { name: 'ISO/IEC 27001', level: 'considered' },
        { name: 'SOC 2', level: 'not-applicable' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the first feed to a reusable template.',
      items: [
        { version: 'v0.1', date: '2026-10-23', dateType: 'actual', status: 'Done', title: 'Sample reels feed' },
        { version: 'v0.2', date: '2026-10-23', dateType: 'actual', status: 'Done', title: 'Midterm deck with 36 cards' },
        { version: 'v0.3', date: '2026-11-13', dateType: 'target', status: 'Planned', title: 'Progress tracking and self-test mode' },
        { version: 'End goal', date: '2026-12-18', dateType: 'target', status: 'Goal', title: 'A reusable template for any course' }
      ]
    }
  },

  {
    id: 'contractor-quote-workbook',
    title: 'Contractor materials quote workbook',
    status: 'Prototype',
    updated: '2026-10-23',
    summary: 'An Excel workbook that turns a short job intake into a clear materials-and-labor quote.',
    tags: ['Excel', 'Operations', 'Quoting'],
    proposal: {
      problem: 'Small contractors often quote by hand, and materials options, waste allowance and labor are easy to miss or misprice.',
      audience: 'Small contractors and the people who help them price jobs.',
      approach: 'An ERP-lite Excel workbook: enter a job once, compare low/medium/high material options, add labor and a waste allowance, and print a one-page quote.',
      results: [
        'Working workbook with an example job, a dashboard and a one-page quote. All prices in it are sample placeholders; it contains no client data.',
        'Companion intake and export templates are built. Live price lookup is not built yet.'
      ],
      objectives: [
        'A consistent quote from a short intake.',
        'Make the waste allowance and margin visible instead of hidden.',
        'Replace sample prices with live price matching.'
      ],
      methodology: [
        'Model the quote as inputs, materials, labor and a summary.',
        'Test with example jobs.',
        'Add intake and export templates for repeat use.'
      ],
      timeline: [
        { phase: 'Workbook with example job', window: 'Sep 2026', status: 'Done' },
        { phase: 'Intake and export templates', window: 'Oct 2026', status: 'Done' },
        { phase: 'Live price matching', window: 'Nov 2026 (target)', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Not set',
      summary: 'No pricing has been set. If offered, it would be a template or a small setup service, scoped per contractor.',
      highlights: ['Illustrative only: no price list is published.']
    },
    docs: {
      visibility: 'summary',
      summary: 'The workbook includes built-in instructions. Files are available on request.',
      items: [
        { title: 'Quote workbook', type: 'Workbook', status: 'On request' },
        { title: 'Intake and export templates', type: 'Spec', status: 'On request' },
        { title: 'Contractor quick-start guide', type: 'Guide', status: 'Planned' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'The workbook is offline and ships with sample data only. Real use involves customer details, which should be handled under the contractor’s own policies.',
      highlights: ['No client data in the published example.', 'No macros in the intake and export templates.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'not-applicable' },
        { name: 'ISO/IEC 27001', level: 'considered' },
        { name: 'SOC 2', level: 'considered' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the first workbook to live price matching.',
      items: [
        { version: 'v0.1', date: '2026-09-13', dateType: 'actual', status: 'Done', title: 'Quote workbook with an example job' },
        { version: 'v0.2', date: '2026-10-23', dateType: 'actual', status: 'Done', title: 'Intake and export templates' },
        { version: 'v0.3', date: '2026-11-20', dateType: 'target', status: 'Planned', title: 'Live price matching' },
        { version: 'End goal', date: '2027-01-29', dateType: 'target', status: 'Goal', title: 'A clear, consistent quote from a short intake' }
      ]
    }
  },

  {
    id: 'bloom',
    title: 'BLOOM',
    status: 'Prototype',
    updated: '2026-09-20',
    summary: 'An AI-assisted companion experience focused on connection and growth for older adults, presented at the CMU Heinz / Replit Buildathon.',
    tags: ['AI', 'Older adults', 'Buildathon'],
    links: [{ label: 'See BLOOM on the main page', href: 'index.html#projects' }],
    proposal: {
      problem: 'Many older adults face isolation and have few approachable, trustworthy ways to use AI in daily life.',
      audience: 'Older adults and the people who support them.',
      approach: 'A companion experience that helps older adults stay connected and keep growing, built quickly during a Build-with-AI buildathon.',
      results: [
        'Presented at the CMU Heinz / Replit Build-with-AI Buildathon and placed top 6.',
        'There is no live product link right now; the original buildathon site is retired.'
      ],
      objectives: [
        'Make AI approachable and useful for older adults.',
        'Ground the concept in research on what older adults actually want from technology.',
        'Decide whether to relaunch it with a live product link.'
      ],
      methodology: [
        'Research older-adult needs and build illustrative personas.',
        'Prototype the experience at the buildathon.',
        'Present, collect feedback and decide next steps.'
      ],
      timeline: [
        { phase: 'Research and buildathon prototype', window: 'Fall 2026', status: 'Done' },
        { phase: 'Decide on relaunch and a live link', window: 'Undecided', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Not set',
      summary: 'No pricing has been defined for BLOOM.',
      highlights: ['Concept-stage; no commercial model yet.']
    },
    docs: {
      visibility: 'summary',
      summary: 'A research brief and a pitch exist. Available on request.',
      items: [
        { title: 'Older-adult needs and personas brief', type: 'Report', status: 'On request' },
        { title: 'Buildathon pitch', type: 'Guide', status: 'On request' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'An AI product for older adults raises real privacy and safety questions. Any relaunch would start with a data-handling and safety review.',
      highlights: ['Privacy and safety review is a gate for any relaunch.', 'No personal data handling is claimed today.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'considered' },
        { name: 'ISO/IEC 27001', level: 'planned' },
        { name: 'SOC 2', level: 'planned' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the buildathon prototype to a possible relaunch. The v0.1 date is approximate.',
      items: [
        { version: 'v0.1', date: '2026-09-20', dateType: 'actual', status: 'Done', title: 'Buildathon prototype presented; placed top 6' },
        { version: 'v0.2', date: '2026-12-18', dateType: 'target', status: 'Planned', title: 'Safety and data-handling review; relaunch decision' },
        { version: 'End goal', date: '2027-03-31', dateType: 'target', status: 'Goal', title: 'A live, safe companion experience for older adults' }
      ]
    }
  },

  {
    id: 'linux-resource-monitor',
    title: 'Linux Live System Resource Monitor',
    status: 'Concept',
    updated: '2026-09-20',
    summary: 'A Rowan University project designing a live monitor that gives alerts and key findings about CPU, memory, network and disk use.',
    tags: ['Linux', 'Systems', 'Modeling'],
    links: [{ label: 'See the diagrams on the main page', href: 'index.html#projects' }],
    proposal: {
      problem: 'System administrators need timely, readable signals about resource use on Linux machines, not raw numbers.',
      audience: 'System administrators and the stakeholders who depend on them.',
      approach: 'Model the monitor’s behavior with use-case and activity diagrams: view CPU, memory, network and disk data, then process running state, with alerts and key findings for the client.',
      results: [
        'Use-case and activity models are complete and shown on the main page.',
        'This was a modeling and design deliverable. A production monitor was not built as part of it.'
      ],
      objectives: [
        'Define who uses the monitor and what they need.',
        'Specify the monitoring flow and the alerts.',
        'Leave a clear design that could be implemented.'
      ],
      methodology: [
        'Identify actors and use cases.',
        'Model the activity flow.',
        'Review the design with the project team.'
      ],
      timeline: [
        { phase: 'Use-case and activity modeling', window: '2025–2026 (course project)', status: 'Done' }
      ]
    },
    pricing: {
      visibility: 'summary', basis: 'Not set',
      summary: 'A coursework design project with no pricing.',
      highlights: ['Academic deliverable; not offered commercially.']
    },
    docs: {
      visibility: 'summary',
      summary: 'The diagrams are public on the main page. Other project documents are available on request.',
      items: [
        { title: 'Use-case and activity diagrams', type: 'Spec', status: 'Public' },
        { title: 'Project report', type: 'Report', status: 'On request' }
      ]
    },
    security: {
      visibility: 'summary',
      summary: 'A monitoring tool would handle sensitive system telemetry, so access control and data handling would be central to any implementation.',
      highlights: ['No implementation exists, so no controls are claimed.', 'Telemetry access and retention would be the key design questions.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'considered' },
        { name: 'ISO/IEC 27001', level: 'considered' },
        { name: 'SOC 2', level: 'not-applicable' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the models to a possible implementation. The v0.1 date is approximate.',
      items: [
        { version: 'v0.1', date: '2026-09-20', dateType: 'actual', status: 'Done', title: 'Use-case and activity models published' },
        { version: 'v0.2', date: '2027-01-29', dateType: 'target', status: 'Planned', title: 'Optional: proof-of-concept collector (not committed)' },
        { version: 'End goal', date: '2027-05-14', dateType: 'target', status: 'Goal', title: 'A working live monitor with alerts and key findings' }
      ]
    }
  },

  {
    id: 'skeptic-ai',
    title: 'Skeptic AI — compliance critic for SDLC teams and AI stacks',
    status: 'In progress',
    updated: '2026-11-01',
    summary: 'An ongoing project: a “proposer and skeptic” assistant that checks which team practices really meet the compliance controls a product claims, and guides each member on what fits their SDLC stage.',
    tags: ['Security compliance', 'AI governance', 'Python', 'Ongoing'],
    links: [{ label: 'Live demo (sample data)', href: 'assets/projects/skeptic-ai/demo.html' }],
    proposal: {
      problem: 'Product teams sign up for several compliance frameworks at once, but the evidence lives in pull requests, design docs, tickets and deployments, and status reports tend to over-claim. AI coding agents now ship changes too, often outside policies written for people.',
      audience: 'SDLC teams (engineers, security, product and compliance leads) and teams that run AI agents in their delivery pipeline.',
      approach: 'Ingest the compliance documents a team believes its product implements. A generous proposer maps each team practice to candidate controls, and a skeptic challenges every mapping before anything is reported as meeting a control. Each member then gets a short update and guidance for the SDLC stage they are in.',
      results: [
        'Working offline prototype on sample data: 23 sample controls from six framework families checked against 18 sample team and agent activities.',
        'The skeptic overturned 15 of 28 proposed mappings on the sample data, including 12 of the team’s own claims.',
        'A per-stage done-gate passes only one of six SDLC stages on the sample data, which shows the team where to focus next.',
        'Not yet tried with a real team. An LLM-backed critic is designed as a plug-in and is not enabled yet.'
      ],
      objectives: [
        'Report a practice as meeting a control only when the evidence supports it.',
        'Give every team member a stage-aware view of what to do next.',
        'Hold AI agents to the same working agreement as people.'
      ],
      methodology: [
        'Split compliance documents into addressable controls.',
        'Propose mappings from team activity, then challenge each one.',
        'Gate each SDLC stage and publish per-member updates and a dashboard.'
      ],
      timeline: [
        { phase: 'Offline prototype with sample data and dashboard', window: 'Nov 2026', status: 'Done' },
        { phase: 'Pilot with a student project team', window: 'Dec 2026 (target)', status: 'Planned' },
        { phase: 'Optional LLM critic behind the same interface', window: 'Early 2027 (target)', status: 'Planned' },
        { phase: 'Integration with a team’s tracker and CI', window: 'Spring 2027 (target)', status: 'Planned' }
      ]
    },
    pricing: {
      visibility: 'private', basis: 'Not set',
      summary: 'A research and portfolio project. No pricing has been defined.',
      highlights: ['No commercial offering yet.']
    },
    docs: {
      visibility: 'summary',
      summary: 'A README, presentation notes and a poster exist for the prototype. Architecture details are available on request.',
      items: [
        { title: 'Interactive dashboard on sample data', type: 'Demo', status: 'On request' },
        { title: 'Architecture and design notes', type: 'Spec', status: 'On request' },
        { title: 'Presentation notes and poster', type: 'Report', status: 'On request' },
        { title: 'Pilot evaluation plan', type: 'Checklist', status: 'Planned' }
      ]
    },
    security: {
      visibility: 'private',
      summary: 'The prototype runs offline on fictional sample data, with no accounts and no personal data. The rule set and security internals are available on request.',
      highlights: ['Offline and sample data only.'],
      frameworks: [
        { name: 'NIST CSF', level: 'considered' },
        { name: 'OWASP', level: 'aligned' },
        { name: 'ISO/IEC 27001', level: 'considered' },
        { name: 'SOC 2', level: 'considered' },
        { name: 'NIST SSDF', level: 'aligned' },
        { name: 'NIST AI RMF', level: 'considered' }
      ]
    },
    revisions: {
      visibility: 'summary',
      summary: 'Versioned milestones from the offline prototype to a tool a team uses during delivery.',
      items: [
        { version: 'v0.1', date: '2026-11-01', dateType: 'actual', status: 'Done', title: 'Offline prototype: proposer and skeptic loop, stage guidance, done-gate and dashboard' },
        { version: 'v0.2', date: '2026-12-11', dateType: 'target', status: 'Planned', title: 'Pilot with a student project team' },
        { version: 'v0.3', date: '2027-02-26', dateType: 'target', status: 'Planned', title: 'Optional LLM critic behind the same interface' },
        { version: 'End goal', date: '2027-05-14', dateType: 'target', status: 'Goal', title: 'A critic that keeps an SDLC team and its AI agents honest about compliance, stage by stage' }
      ]
    },
    media: {
      label: 'Demo snapshots',
      note: 'Sample data only: a fictional team and paraphrased framework excerpts.',
      images: [
        { src: 'assets/projects/skeptic-ai/dashboard-overview.png', alt: 'Skeptic AI dashboard: adherence matrix by framework and SDLC stage with a done-gate row', caption: 'Adherence matrix by framework and SDLC stage, with the per-stage done-gate.' },
        { src: 'assets/projects/skeptic-ai/dashboard-gaps.png', alt: 'Open gaps table with the critic’s reasons', caption: 'Open gaps and evidence requests, each with the critic’s reason.' },
        { src: 'assets/projects/skeptic-ai/dashboard-mobile.png', alt: 'Dashboard on a phone-width screen', caption: 'The same dashboard at phone width.' }
      ],
      code: {
        caption: 'The done-gate rule (simplified): a stage is never reported as done without checks, or with any red check.',
        text: 'def stage_gate(stage, verdicts):\n    checks = [v for v in verdicts if v.stage == stage]\n    red = [v for v in checks if v.verdict != "Adheres"]\n    if not checks:\n        return "Empty"     # exit 2\n    if red:\n        return "NotDone"   # exit 1\n    return "Done"          # exit 0'
      }
    }
  }
];
