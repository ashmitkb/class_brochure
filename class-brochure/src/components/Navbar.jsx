import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { classInfo } from '../data/students'
import GlassSurface from './GlassSurface'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#top' },
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
      {/* Centering is done by the wrapper (left/right/margin-auto), never by
          transform — Framer Motion writes its own inline transform for the
          y-slide-in below, which would otherwise clobber a CSS translateX
          center and silently knock the bar off-center. */}
      <div className="glass-nav-wrap">
        <motion.div
          className="glass-nav-motion"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <GlassSurface
            width="100%"
            height={68}
            borderRadius={999}
            distortionScale={-120}
            displace={0.6}
            brightness={scrolled ? 30 : 55}
            className={`glass-nav-surface ${scrolled ? 'scrolled' : ''}`}
          >
            <div className="glass-nav">
              <a href="#top" className="glass-nav-brand">
                <img src="/logo.png" alt="Christ University" className="glass-nav-logo" />
                <span className="glass-nav-brand-text">
                  <span className="glass-nav-brand-title">{classInfo.name}</span>
                  <span className="mono glass-nav-brand-sub">BATCH {classInfo.batch}</span>
                </span>
              </a>

              <nav className="glass-nav-links">
                {links.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </nav>

              <a href="#directory" className="glass-nav-cta">Meet the Class</a>

              <button
                className="glass-nav-burger"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
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
