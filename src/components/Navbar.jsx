import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { classInfo } from '../data/students'
import GlassSurface from './GlassSurface'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Program', href: '#programme' },
  { label: 'Students', href: '#directory' },
  { label: 'Stats', href: '#stats' },
  { label: 'Contact', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Centering is done by the wrapper (left/right/margin-auto). The
          entrance animation below animates `marginTop`, not `y` (which
          Framer Motion would compile to a CSS `transform`) — any ancestor
          OR the element itself carrying a `transform` redefines where
          backdrop-filter samples its "backdrop" from (per spec, transform/
          filter/perspective on an element makes it a new "backdrop root"),
          so a transformed wrapper around a blurred bar has nothing real
          behind it to blur and renders fully see-through. marginTop is a
          plain layout property — no transform anywhere in the chain, so
          the blur actually samples the real page behind it. */}
      <div className="glass-nav-wrap">
        <motion.div
          className="glass-nav-motion"
          initial={{ marginTop: -40, opacity: 0 }}
          animate={{ marginTop: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Real react-bits GlassSurface: an SVG feDisplacementMap built
              from a live per-pixel edge map, so the backdrop actually bends
              near the pill's border like real glass instead of a flat CSS
              blur. color-scheme: dark is forced on it in Navbar.css so its
              light-dark() frost always resolves to the dark tint — this
              pill sits over a dark hero photo or a light page either way,
              and light nav text needs a dark backdrop to stay legible. */}
          <GlassSurface
            className={`navbar-glass ${scrolled ? 'scrolled' : ''}`}
            width="100%"
            height="auto"
            borderRadius={999}
            backgroundOpacity={scrolled ? 0.6 : 0.12}
            brightness={scrolled ? 22 : 58}
            opacity={0.92}
            blur={scrolled ? 22 : 18}
            displace={1.4}
            distortionScale={-32}
            greenOffset={2}
            blueOffset={4}
          >
            <header className="glass-nav-inner">
              <a href="#top" className="glass-nav-brand">
                {/* import.meta.env.BASE_URL, not a hardcoded "/", so this still
                    resolves once vite.config.js sets a base path for GitHub
                    Pages (a plain "/christ-logo.png" 404s under a project-page
                    base like /class_brochure/). */}
                <img
                  src={`${import.meta.env.BASE_URL}christ-logo.png`}
                  alt="Christ University"
                  className="glass-nav-logo"
                />
                <span className="glass-nav-brand-text">
                  <span className="mono glass-nav-brand-sub">BATCH {classInfo.batch}</span>
                </span>
              </a>

              <nav className="glass-nav-links">
                {links.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </nav>

              <motion.a
                href="#directory"
                className="glass-nav-cta"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                Meet the Class
              </motion.a>

              <button
                className="glass-nav-burger"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </header>
          </GlassSurface>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
            <nav>
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
