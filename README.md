# Preet Desai — Portfolio

Personal site for **Preet Desai**, a Carnegie Mellon Heinz **MSISPM** student focused on cyber, risk, and GRC. Built for hiring officers: name and target role in five seconds, then proof (experience, projects, education, skills, resume).

## Live URL

**https://preet-desai.me**

GitHub Pages also serves the same files at https://pmg-build.github.io. The custom domain is the canonical URL.

## What’s on the site

- About (rewritten for hiring officers) with a personal photo collage — swap `assets/life-01.jpg`–`life-03.jpg`
- Experience, projects/achievements, education, skills, contact
- Resume page (`resume.html`) and PDF link (`resume.pdf`)
- Projects: BLOOM (Heinz / Replit Buildathon) and Linux Live System Resource Monitor, plus Marketplace Risk NYC attendance
- Socials: LinkedIn, Instagram `@pmg.preet`, YouTube `@pmg-preet`, BLOOM

## Tech stack

- Static HTML, CSS, and a small `script.js` (mobile nav + profile preview modals)
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
