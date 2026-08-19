# Class Brochure — MSc Data Science & MSc AI/Cyber Security, Batch 2025-27

## Run it locally
```
npm install
npm run dev
```
Open http://localhost:5173

## Deploy to Vercel
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Framework preset: Vite (auto-detected) → Deploy
No config needed — it's a static build.

## Add real student data
Edit `src/data/students.js`. Each student is one object — keep the same
field names (name, program, photo, tagline, bio, technicalSkills, etc.)
and the whole site updates automatically: card grid, search, filters,
and the profile drawer all read from this one file.

`program` is a loose "focus area" tag (web / data / security, or
whatever you rename them to in the `programs` list at the top of the
file) — the filter pills are generated from that list automatically.

## Photos
Cards expect **passport-style photos** (portrait crop, plain
background) — the grid frames them at a fixed 108×136px box, so any
consistent ID-style photo will line up cleanly. Use direct image URLs,
or host them in `public/photos/` and reference `/photos/filename.jpg`.

## Logo
The navbar currently hotlinks Christ University's public logo
(`christuniversity.in/images/logo.png`) with a CSS filter forcing it
white. For a real deployment, download the official crest, drop it in
`public/logo.png`, and swap the `src` in `src/components/Navbar.jsx`
(`glass-nav-logo`) to `/logo.png` — safer than depending on an
external URL staying up, and check with your class/department if
there are branding guidelines for using the crest.

## Structure
- `src/components/CinematicHero.jsx` — the scroll-driven intro (network animation)
- `src/components/AboutCohort.jsx` — stats section
- `src/components/Directory.jsx` — searchable/filterable student grid
- `src/components/ProfileDrawer.jsx` — individual profile panel
- `src/components/Navbar.jsx` — glass nav bar
- `src/data/students.js` — all student data lives here
