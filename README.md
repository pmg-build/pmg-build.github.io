# Preet Desai — Portfolio

Personal site for **Preet Desai**, a Carnegie Mellon Heinz **MSISPM** student focused on cyber, risk, and GRC. Built for hiring officers: name and target role in five seconds, then proof (experience, projects, education, skills, resume).

## Live URL

**https://preet-desai.me**

GitHub Pages also serves the same files at https://pmg-build.github.io. The custom domain is the canonical URL.

## What’s on the site

- About (rewritten for hiring officers)
- Hero / About / Projects / Life use approved scenic backgrounds with a dark scrim so copy stays readable
- Hero is a full viewport (taller on desktop) so `backgrounds-01.jpg` can show as a complete framed photo
- Major sections are at least `100dvh` / `100vh`
- Mission line and light scroll progress: automate the industry and make AI environments safer for everyday use
- Headshot cropped from `assets/gallery/content/portraits/portraits-05.jpg`
- Experience, projects/achievements, education, skills, contact
- Life gallery with All / Shenanigans / Social / Community filters and a keyboard-accessible lightbox
- Resume page (`resume.html`) and PDF link (`resume.pdf`)
- Projects: BLOOM (Heinz / Replit Buildathon, top 6; no broken product URL) and Linux Live System Resource Monitor, plus Marketplace Risk attendance with a YouTube link
- Socials: LinkedIn, Instagram `@pmg.preet`, YouTube `@pmg-preet`

## Image library

Approved stills live under `assets/gallery/` in the same folders Preet signed off on:

- `backgrounds/` — section overlays
- `content/portraits/` — source portraits (hero uses a face crop of portraits-05)
- `content/shenanigans/`, `content/social/`, `content/community/` — Life gallery
- `content/achievements/` — projects/achievements
- `content/diagrams/` — Linux monitor original activity diagram (use-case stays the existing SVG)

## Tech stack

- Static HTML, CSS, and a small `script.js` (mobile nav, profile preview modals, gallery lightbox)
- GitHub Pages
- Custom domain via `CNAME` → `preet-desai.me`
- Google Fonts (Instrument Serif, Source Sans 3)
- No build step, no framework

## Local preview

Open `index.html` in a browser, or serve the repo root:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Repo About (GitHub UI only)

Git cannot set the repository **About** sidebar. In the GitHub UI, set:

- Description: `Portfolio — Preet Desai, CMU Heinz MSISPM. Cyber, risk, GRC. Summer 2027.`
- Website: `https://preet-desai.me`

See `WHAT-PREET-DOES.md` for HTTPS enforcement and the real resume PDF upload.
