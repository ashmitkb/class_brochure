import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

// Counts up to `value` once it scrolls into view — small detail, but it's
// the difference between a stats section that looks static and one that
// feels alive/"dashboard-like".
export default function AnimatedNumber({ value }) {
  const ref = useRef(null)
  // A generous *positive* margin — not the shrinking negative kind — so the
  // "is this in view" check triggers well before the number is actually on
  // screen. On a fast mobile flick-scroll, a tight/negative margin means the
  // element can skip straight past the trigger zone between two scroll
  // frames without ever registering as "in view", leaving the count stuck
  // at its starting 0 forever (this was happening for most of the stats
  // row, since a quick flick could easily jump 80px+ in one frame).
  const inView = useInView(ref, { once: true, margin: '200px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 90, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value])

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString()
    })
    return unsub
  }, [spring])

  return <span ref={ref}>0</span>
}
