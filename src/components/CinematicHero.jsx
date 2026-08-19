import { useRef } from 'react'
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'
import { students, classInfo } from '../data/students'
import './CinematicHero.css'

const faces = students.slice(0, 6)

const scatter = [
  { x: -38, y: -22, rot: -8 },
  { x: 34, y: -28, rot: 6 },
  { x: -30, y: 24, rot: 5 },
  { x: 38, y: 20, rot: -6 },
  { x: -12, y: -34, rot: 3 },
  { x: 14, y: 32, rot: -4 },
]

const nodeTargets = [
  { x: -14, y: -10 },
  { x: 14, y: -12 },
  { x: -18, y: 8 },
  { x: 18, y: 10 },
  { x: -2, y: -18 },
  { x: 2, y: 18 },
]

// Ease-out-quint — decelerates gently instead of stopping abruptly,
// used throughout so the scroll-driven motion feels weighted, not linear.
const smooth = cubicBezier(0.22, 1, 0.36, 1)

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function HeroFace({ student, start, end, scrollYProgress, accent }) {
  const x = useTransform(scrollYProgress, [0.15, 0.58], [start.x, end.x], { ease: smooth })
  const y = useTransform(scrollYProgress, [0.15, 0.58], [start.y, end.y], { ease: smooth })
  const xPx = useTransform(x, (v) => `${v}vw`)
  const yPx = useTransform(y, (v) => `${v}vh`)
  const rotate = useTransform(scrollYProgress, [0.15, 0.58], [start.rot, 0], { ease: smooth })
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.58, 0.7], [0.7, 1, 1.15, 1], { ease: smooth })

  return (
    <motion.div
      className={`hero-face ${accent ? 'accent' : ''}`}
      style={{ x: xPx, y: yPx, rotate, scale }}
    >
      <span className="mono">{initials(student.name)}</span>
    </motion.div>
  )
}

export default function CinematicHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0], { ease: smooth })
  const headlineY = useTransform(scrollYProgress, [0, 0.32], [0, -60], { ease: smooth })

  const linesOpacity = useTransform(scrollYProgress, [0.32, 0.52, 0.76], [0, 1, 0], { ease: smooth })
  const sceneScale = useTransform(scrollYProgress, [0.6, 1], [1, 1.16], { ease: smooth })
  const sceneOpacity = useTransform(scrollYProgress, [0.66, 0.96], [1, 0], { ease: smooth })

  const subOpacity = useTransform(scrollYProgress, [0.74, 0.92], [0, 1], { ease: smooth })
  const subY = useTransform(scrollYProgress, [0.74, 0.92], [30, 0], { ease: smooth })

  return (
    <section className="hero-pin-wrap" ref={ref}>
      <div className="hero-sticky">
        <motion.div className="hero-scene" style={{ scale: sceneScale, opacity: sceneOpacity }}>
          <div className="hero-grain" />

          <motion.div className="hero-headline" style={{ opacity: headlineOpacity, y: headlineY }}>
            <span className="hero-eyebrow mono">CHRIST (DEEMED TO BE UNIVERSITY) · YPR CAMPUS</span>
            <h1>
              4th Year BCA.
              <br />
              Batch 2023
              <br />
              <span className="hero-headline-accent">to 2027.</span>
            </h1>
          </motion.div>

          <svg className="hero-lines" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
            <motion.g style={{ opacity: linesOpacity }}>
              {nodeTargets.map((n, i) =>
                nodeTargets.slice(i + 1).map((m, j) => (
                  <line
                    key={`${i}-${j}`}
                    x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                    stroke="var(--steel)" strokeWidth="0.15" opacity="0.35"
                  />
                ))
              )}
            </motion.g>
          </svg>

          {faces.map((s, i) => (
            <HeroFace
              key={s.id}
              student={s}
              start={scatter[i]}
              end={nodeTargets[i]}
              scrollYProgress={scrollYProgress}
              accent={i % 2 === 1}
            />
          ))}

          <motion.div className="hero-sub" style={{ opacity: subOpacity, y: subY }}>
            <p className="mono hero-sub-label">BACHELOR OF COMPUTER APPLICATIONS</p>
            <p className="hero-sub-line">Keep scrolling to meet the class.</p>
          </motion.div>

          <motion.div className="hero-glass-card" style={{ opacity: subOpacity, y: subY }}>
            <span className="hero-glass-badge mono">● FINAL YEAR</span>
            <p className="hero-glass-title">BCA 2023 – 27</p>
            <p className="hero-glass-sub">Dept. of Computer Science</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
