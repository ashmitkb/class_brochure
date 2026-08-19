import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` has to match the repo name for a GitHub Pages *project* site
// (username.github.io/<repo>/) — without it every asset/script the built
// index.html references resolves to the domain root and 404s, which is
// why the deployed link wasn't showing anything.
//
// Vercel (and any custom domain) serves from the domain root instead, so
// it needs base: '/'. Rather than hand-editing this file every time you
// switch targets, the GitHub Actions workflow sets GITHUB_PAGES=true
// during its build step (see .github/workflows/deploy.yml) — Vercel's
// build doesn't set that, so it automatically gets base: '/'.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/class_brochure/' : '/',
  plugins: [react()],
})
