import { useEffect, useRef, useState } from 'react'

// Loaded from a CDN instead of an npm dependency, so this works without
// anyone having to run `npm install` first — it just needs a normal
// internet connection at runtime, same as any other script tag.
const PDFJS_VERSION = '3.11.174'
const PDFJS_SCRIPT_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`
const PDFJS_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`

let pdfjsLoadPromise = null
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib)
  if (pdfjsLoadPromise) return pdfjsLoadPromise
  pdfjsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = PDFJS_SCRIPT_URL
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL
      resolve(window.pdfjsLib)
    }
    script.onerror = () => reject(new Error('Failed to load pdf.js'))
    document.head.appendChild(script)
  })
  return pdfjsLoadPromise
}

// Renders a PDF as a stack of full-width page images drawn onto <canvas>
// elements — no native browser PDF-viewer chrome (toolbar, page-number
// box, its own scrollbar), so it reads like an actual resume page sitting
// inside the site instead of an embedded file viewer. Re-renders whenever
// the panel is resized so it always fills the width edge to edge.
export default function ResumeViewer({ url, title }) {
  const wrapRef = useRef(null)
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const observer = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width)
      setWidth((prev) => (Math.abs(prev - w) > 24 ? w : prev))
    })
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!width || !url) return
    let cancelled = false
    setStatus('loading')

    async function render() {
      try {
        const pdfjsLib = await loadPdfJs()
        if (cancelled) return
        const pdf = await pdfjsLib.getDocument(url).promise
        if (cancelled) return

        const container = containerRef.current
        if (!container) return
        container.innerHTML = ''

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return
          const page = await pdf.getPage(pageNum)
          const baseViewport = page.getViewport({ scale: 1 })
          // Render at 2x the display size for crisp text on retina
          // screens, then let CSS scale the canvas back down to fit.
          const scale = (width / baseViewport.width) * 2
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement('canvas')
          canvas.className = 'resume-viewer-page'
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = `${width}px`
          canvas.style.height = `${(viewport.height / viewport.width) * width}px`
          container.appendChild(canvas)

          const ctx = canvas.getContext('2d')
          await page.render({ canvasContext: ctx, viewport }).promise
        }

        if (!cancelled) setStatus('ready')
      } catch (err) {
        console.error('Resume preview failed to render', err)
        if (!cancelled) setStatus('error')
      }
    }

    render()
    return () => { cancelled = true }
  }, [url, width])

  return (
    <div className="resume-viewer" ref={wrapRef}>
      {status === 'loading' && (
        <p className="resume-viewer-status">Loading {title ? `${title}'s ` : ''}resume…</p>
      )}
      {status === 'error' && (
        <p className="resume-viewer-status resume-viewer-status-error">
          Couldn't preview this resume inline. Use Download or open it in a new tab instead.
        </p>
      )}
      <div className="resume-viewer-pages" ref={containerRef} />
    </div>
  )
}
