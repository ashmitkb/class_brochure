import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

function HeroFace({ student, start, end, scrollYProgress }) {
  const x = useTransform(scrollYProgress, [0.15, 0.55], [start.x, end.x])
  const y = useTransform(scrollYProgress, [0.15, 0.55], [start.y, end.y])
  const xPx = useTransform(x, (v) => `${v}vw`)
  const yPx = useTransform(y, (v) => `${v}vh`)
  const rotate = useTransform(scrollYProgress, [0.15, 0.55], [start.rot, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.7], [0.7, 1, 1.15, 1])

  return (
    <motion.div className="hero-face" style={{ x: xPx, y: yPx, rotate, scale }}>
      <img src={student.photo} alt="" />
    </motion.div>
  )
}

export default function CinematicHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  const linesOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.75], [0, 1, 0])
  const sceneScale = useTransform(scrollYProgress, [0.6, 1], [1, 1.15])
  const sceneOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0])

  const subOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1])
  const subY = useTransform(scrollYProgress, [0.72, 0.9], [30, 0])

  return (
    <section className="hero-pin-wrap" ref={ref}>
      <div className="hero-sticky">
        <motion.div className="hero-scene" style={{ scale: sceneScale, opacity: sceneOpacity }}>
          <div className="hero-grain" />

          <motion.div className="hero-headline" style={{ opacity: headlineOpacity, y: headlineY }}>
            <span className="hero-eyebrow mono">CHRIST (DEEMED TO BE UNIVERSITY) · YPR CAMPUS</span>
            <h1>
              7 BCA.
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
            />
          ))}

          <motion.div className="hero-sub" style={{ opacity: subOpacity, y: subY }}>
            <p className="mono hero-sub-label">BACHELOR OF COMPUTER APPLICATIONS</p>
            <p className="hero-sub-line">Keep scrolling to meet the class.</p>
          </motion.div>

          <motion.div className="hero-glass-card" style={{ opacity: subOpacity, y: subY }}>
            <span className="hero-glass-badge mono">● SECTION 7</span>
            <p className="hero-glass-title">BCA 2023 – 27</p>
            <p className="hero-glass-sub">Dept. of Computer Science</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
