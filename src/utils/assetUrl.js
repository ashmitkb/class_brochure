// Resolves a path under public/ (e.g. "students/stu-001.jpg") to a real
// URL the browser can fetch, respecting whatever base path Vite is
// currently building for (see the comment in vite.config.js — "/" on
// Vercel, "/class_brochure/" on GitHub Pages). Using this instead of a
// hardcoded leading "/" is what makes an asset reference survive moving
// between deploy targets.
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path}`
}
