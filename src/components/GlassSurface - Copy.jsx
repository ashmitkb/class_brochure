import { useEffect, useId, useRef, useState } from 'react'
import './GlassSurface.css'

// A simplified recreation of the react-bits GlassSurface component:
// draws a rounded-rect displacement map to a canvas (bright at the edges,
// flat in the middle) and feeds it through an SVG feDisplacementMap so the
// backdrop actually bends near the border like real glass, instead of a
// flat CSS blur. Falls back to plain backdrop-blur if the browser can't
// build the map (SSR, older Safari, etc).
export default function GlassSurface({
  children,
  width = '100%',
  height = '100%',
  borderRadius = 24,
  displace = 0.5,
  distortionScale = -140,
  brightness = 50,
  opacity = 0.9,
  mixBlendMode = 'screen',
  className = '',
  style = {},
}) {
  const rawId = useId().replace(/[:]/g, '')
  const filterId = `glass-filter-${rawId}`
  const containerRef = useRef(null)
  const [mapUrl, setMapUrl] = useState('')

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof document === 'undefined') return

    const build = () => {
      const w = Math.max(1, el.clientWidth)
      const h = Math.max(1, el.clientHeight)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const r = Math.min(typeof borderRadius === 'number' ? borderRadius : 24, w / 2, h / 2)

      ctx.fillStyle = '#808080'
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.arcTo(w, 0, w, h, r)
      ctx.arcTo(w, h, 0, h, r)
      ctx.arcTo(0, h, 0, 0, r)
      ctx.arcTo(0, 0, w, 0, r)
      ctx.closePath()
      ctx.clip()

      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#ffffff')
      grad.addColorStop(0.15, '#808080')
      grad.addColorStop(0.85, '#808080')
      grad.addColorStop(1, '#202020')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      setMapUrl(canvas.toDataURL())
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(el)
    return () => ro.disconnect()
  }, [borderRadius])

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${className}`}
      style={{ width, height, borderRadius, ...style }}
    >
      {mapUrl && (
        <svg className="glass-surface-defs" aria-hidden="true">
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage href={mapUrl} x="0" y="0" width="100%" height="100%" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="R"
              result="disp"
            />
            <feGaussianBlur in="disp" stdDeviation={displace} />
            <feComponentTransfer>
              <feFuncR type="linear" slope={brightness / 50} />
              <feFuncG type="linear" slope={brightness / 50} />
              <feFuncB type="linear" slope={brightness / 50} />
            </feComponentTransfer>
          </filter>
        </svg>
      )}

      <div
        className="glass-surface-clip"
        style={{ borderRadius }}
      >
        <div
          className="glass-surface-backdrop"
          style={{
            opacity,
            mixBlendMode,
            filter: mapUrl ? `url(#${filterId})` : undefined,
          }}
        />
        <div className="glass-surface-sheen" />
      </div>
      <div className="glass-surface-content">{children}</div>
    </div>
  )
}
