import './Recruiters.css'

// Plain wordmarks rather than reproduced brand logos — keeps this honest
// (we don't hold rights to redraw anyone's mark) while still reading as a
// recruiter strip. Add names here as more come in.
const recruiters = [
  'miQ Digital',
  'Perficient',
  'Xoria',
  'Deloitte',
  'Accenture',
  'DigiLedge',
  'KPMG',
]

export default function Recruiters() {
  // Duplicated once so the CSS marquee can loop seamlessly.
  const track = [...recruiters, ...recruiters]

  return (
    <section className="recruiters-section" id="recruiters">
      <p className="mono cohort-eyebrow recruiters-eyebrow">04 / OUR RECRUITERS</p>
      <h2 className="recruiters-heading">Our Persistent Recruiters</h2>

      <div className="recruiters-marquee">
        <div className="recruiters-track">
          {track.map((name, i) => (
            <span className="recruiter-chip" key={`${name}-${i}`}>
              <span className="recruiter-dot" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
