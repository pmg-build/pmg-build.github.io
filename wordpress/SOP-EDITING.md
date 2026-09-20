# SOP: Edit every section in wp-admin (no code)

WordPress is the source of truth. The static `index.html` at the repo root is an optional visual preview only.

Inspiration for structure and appearance: [Student portfolio examples](https://www.sitebuilderreport.com/inspiration/student-portfolio-examples) (Kayla Padilla / Kabel Ligot simplicity; Florence Chen dedicated Resume; Cho Laam Yuen research/project callouts).

Upload `wordpress/preet-desai-theme.zip` at **Appearance → Themes → Add New → Upload Theme**, then **Activate**.

## What Preet does (checklist)

Do these in wp-admin. Do not invent roles, metrics, or bio copy.

1. **Simplicity + type hierarchy** — Appearance → Editor → Styles. Keep the stack **name → role → school** (`Preet Desai` / `GRC & Compliance Builder` / `Carnegie Mellon University — Heinz College · MSISPM ’28`). Tokens: Name, Role, School, Section, Kicker.
2. **Site structure** — Homepage uses Front Page (About / Experience / Work / Resume / Contact). Optional dedicated pages: inserter → **Page — About / Experience / Work / Resume / Contact**, status **Published**.
3. **Identity in 5 seconds** — On About, confirm school (CMU Heinz MSISPM), interests (Cyber · Risk · GRC), and the **Resume** button. Replace that button URL with a Media Library PDF when you have one (until then `#resume` is the on-page resume).
4. **Not one wall of text** — Experience stays in cards. Work is featured research/projects plus Achievements and Projects. Resume is the condensed roles list + education + skills.
5. **Call out research / projects** — Edit **Featured research & projects** (Sensonics R&D, BLOOM, Linux monitor). Do not add a “Leadership” line unless it is a real title you already use.
6. **Minimal chrome, contrast, mobile** — Leave default colors (Base / Contrast / Accent). Check a phone: five nav links wrap and stay visible; buttons stay 44px+.
7. **One public URL** — On applications use `https://preet-desai.me` only. Footer and Resume already say this. HTTPS on the domain is your task, not a code change.
8. **Edit without code** — Click any block on Front Page or a page. Use **Recruiter cards** and **Connect & modals** to add items. Styles panel for color, type, and spacing. **Save** (templates are not drafts). Never set a Draft page as Settings → Reading homepage.

## Where to edit (never use a Draft page as the public homepage)

| What hiring officers see | Where you edit it | How you publish |
| --- | --- | --- |
| Full recruiter homepage | **Appearance → Editor → Templates → Front Page** | Click **Save**. Templates are live, not drafts. |
| Site-wide colors, type, spacing | **Appearance → Editor → Styles** | Save |
| Header / footer | **Appearance → Editor → Patterns → Template Parts** (Header, Footer) | Save |
| Dedicated About / Experience / Work / Resume / Contact | **Pages → All Pages** (or insert the matching page pattern) | Status must be **Published** |

Do **not** leave a page in **Draft** and set it as Settings → Reading homepage.

## Styles, typography, colors, spacing (Site Editor)

1. Appearance → Editor → **Styles** (half-moon icon).
2. **Colors** — Base, Elevated, Card, Contrast, Muted, Accent, Accent 2, Success, Ink, List, Skill, Live text.
3. **Typography** — Inter and JetBrains Mono. Sizes: Kicker, Small, Medium, Role, School, Section, Name.
4. **Layout** — content width 1120px. Spacing scale 1–9.
5. **Blocks** — card, kicker, pill, primary / secondary / ghost buttons.

## Section-by-section formatting

Open **Front Page**, then List View.

### About (identity)

- Headshot: **Replace**; keep alt “Preet Desai headshot”.
- H1 = name. Next lines = role, school, interests. Do not collapse them back into one pipe-separated headline.
- Resume / LinkedIn / Contact buttons: edit labels and URLs in the sidebar.
- After you upload a resume PDF: select Resume → Link → Media Library file.

### Experience

- Group style **Experience card**. Insert **Experience card** to add a role. Edit company, role meta, bullets.

### Work (projects & achievements)

- Featured row: Research / Project tags on Sensonics, BLOOM, Linux monitor.
- Achievement cards: cover + tag + title + body. Replace photos.
- Project card: replace the two diagram covers.

### Resume (Florence Chen style)

- Condensed roles list, then Education cards, then skill chips.
- Public URL line must stay `https://preet-desai.me`.
- Insert **Education card** or **Skill chip** to extend. Delete a chip to remove it.

### Contact

- Platform patterns (LinkedIn, Instagram, YouTube, BLOOM): edit handle, one-liner, Open URL, and the modal title/body.
- Desktop shows the modal; phones go straight to the URL.

## Media

Prefer **Replace** on the existing image/cover. Use the existing alt text.

## Recruiting-ready

See `RECRUITING-READY.md`.
