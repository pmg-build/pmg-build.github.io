# SOP: Edit every section in wp-admin (no code)

WordPress is the source of truth. The static `index.html` at the repo root is an optional visual preview only.

Upload `wordpress/preet-desai-theme.zip` at **Appearance → Themes → Add New → Upload Theme**, then **Activate**.

## Where to edit (never use a Draft page as the public homepage)

| What hiring officers see | Where you edit it | How you publish |
| --- | --- | --- |
| Full recruiter homepage | **Appearance → Editor → Templates → Front Page** | Click **Save**. Templates are live, not drafts. |
| Site-wide colors, type, spacing | **Appearance → Editor → Styles** | Save |
| Header / footer | **Appearance → Editor → Patterns → Template Parts** (Header, Footer) | Save |
| A standalone page | **Pages → All Pages** | Status must be **Published** |

Do **not** leave a page in **Draft** and set it as Settings → Reading homepage. Visitors (or you, while logged in) can then see a Draft badge. Use the Front Page template instead.

Dashboard widget **Recruiting-ready checklist** repeats these checks.

## Styles, typography, colors, spacing (Site Editor)

1. Appearance → Editor → **Styles** (half-moon icon).
2. **Colors** — palette tokens: Base, Elevated, Card, Contrast, Muted, Accent, Accent 2, Success, Ink, List, Skill, Live text.
3. **Typography** — Inter (body/headings) and JetBrains Mono (kickers). Font sizes: Kicker, Small, Medium, Section, Large.
4. **Layout** — content width 1120px. Spacing scale 1–9 maps to the card and section gaps.
5. **Blocks** — select a heading, paragraph, button, or group and change its style (card, kicker, pill, primary button, etc.) from the block sidebar.

These tokens live in `theme.json`. Changing them in Styles updates the whole site.

## Section-by-section formatting

Open **Front Page**, click the section, then use List View (left) to pick the exact block.

### Hero

- Cover block = banner. Click **Replace** to upload the LinkedIn banner.
- Image in the gradient frame = headshot. **Replace** the image; keep alt text “Preet Desai headshot”.
- H1, headline paragraph, pills, and CTA buttons are normal blocks. Change size/color in the sidebar.
- Pill styles: **Pill** and **Live pill** (block style on the Button).
- CTA styles: **Primary**, **Secondary**, **Ghost**.

### Experience

- Section kicker (`01 — Experience`) uses paragraph style **Section kicker**.
- Each role is a Group with style **Experience card**.
- To add a role: inserter → **Recruiter cards → Experience card**, then edit company, role meta, and bullets.
- To change card padding or radius: select the Group → Styles → Dimensions / Border.

### Education

- Degree line is a paragraph with class `pd-degree` (cyan). Color comes from Accent 2 — change it in Styles or on that paragraph.
- Insert **Education card** to add another school.

### Achievements

- Each card is **Achievement card**: cover (photo) + tag + title + body.
- Replace the cover image; the instructional “Replace with…” line disappears once a photo is set.
- Grid is a Group with class `pd-achievement-grid`. Change columns via Group → Layout if needed.

### Projects

- Insert **Project card** for another project.
- The two diagram slots are Cover blocks. Replace each with the use-case / activity diagram.

### Skills

- Each chip is a paragraph with style **Skill chip**.
- Insert **Skill chip** for a new tool. Delete a chip to remove it.
- Wrap stays a flex row; spacing is the theme spacing scale.

### Connect + platform modals

Each platform is its own pattern (LinkedIn, Instagram, YouTube, BLOOM):

1. Card copy (platform label, handle, one-line description) — edit in place.
2. **Open …** button URL = destination. The modal “Open link” button copies this URL in the browser.
3. Modal title and body sit in the **Connect card’s** sibling Group (`pd-modal`). In the editor the modal is visible on purpose so you can edit it. On the public site it only appears after click (desktop). On small screens the card goes straight to the URL.
4. To add a network: inserter → **Connect & modals** → pick a platform pattern and change the text/URL.

## Media

Appearance → Editor, or Media Library. Prefer **Replace** on the existing image/cover so layout stays put. Use the existing alt text from the portfolio.

## Recruiting-ready (production)

See `RECRUITING-READY.md`. Short version: Front Page saved, no Draft homepage, images replaced, Connect URLs clicked, contrast left on the default tokens (they meet WCAG for body text).
