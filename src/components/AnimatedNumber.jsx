import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

// Counts up to `value` once it scrolls into view — small detail, but it's
// the difference between a stats section that looks static and one that
// feels alive/"dashboard-like".
export default function AnimatedNumber({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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
