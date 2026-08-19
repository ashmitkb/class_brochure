import { motion, useScroll, useSpring } from 'framer-motion'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Spring-smoothed so the bar eases rather than jitters with raw scroll deltas
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  return <motion.div className="scroll-progress" style={{ scaleX }} />
}
