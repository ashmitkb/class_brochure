import { motion } from 'framer-motion'
import { classInfo } from '../data/students'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="hero">
      {/* public/christ-campus-photo.JPG — the dark image layer; the gradient
          on top of it (.hero-overlay) is what keeps the headline readable.
          Built from import.meta.env.BASE_URL rather than a hardcoded "/" —
          with vite.config.js's base set for GitHub Pages, a plain
          "/christ-campus-photo.JPG" 404s because the site is served from
          /class_brochure/, not the domain root. This was the actual cause
          of the background not showing up. */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}christ-campus-photo.JPG')` }}
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.span
          className="hero-eyebrow mono"
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          CHRIST (DEEMED TO BE UNIVERSITY) · YPR CAMPUS
        </motion.span>

        <motion.h1 custom={1} initial="hidden" animate="show" variants={fadeUp}>
          4th Year BCA.
          <br />
          Batch 2023
          <br />
          <span className="hero-headline-accent">to 2027.</span>
        </motion.h1>

        <motion.p
          className="hero-sub-line"
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          Meet the class.
        </motion.p>
      </div>

      <motion.div
        className="hero-glass-card"
        custom={3}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <span className="hero-glass-badge mono">● FINAL YEAR</span>
        <p className="hero-glass-title">BCA 2023 – 27</p>
        <p className="hero-glass-sub">Dept. of Computer Science</p>
      </motion.div>
    </section>
  )
}
