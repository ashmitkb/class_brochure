import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './Dock.css'

function DockItem({ mouseX, item, baseItemSize, magnification, distanceRange }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize }
    return val - bounds.x - bounds.width / 2
  })

  const sizeSync = useTransform(
    distance,
    [-distanceRange, 0, distanceRange],
    [baseItemSize, magnification, baseItemSize]
  )
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 180, damping: 14 })

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={item.onClick}
      className="dock-item"
      aria-label={item.label}
    >
      {hovered && (
        <motion.span
          className="dock-label"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
        >
          {item.label}
        </motion.span>
      )}
      <span className="dock-icon">{item.icon}</span>
    </motion.button>
  )
}

export default function Dock({
  items,
  panelHeight = 56,
  baseItemSize = 36,
  magnification = 52,
  distanceRange = 120,
}) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      className="dock-panel"
      style={{ height: panelHeight }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item, i) => (
        <DockItem
          key={item.label ?? i}
          mouseX={mouseX}
          item={item}
          baseItemSize={baseItemSize}
          magnification={magnification}
          distanceRange={distanceRange}
        />
      ))}
    </motion.div>
  )
}
