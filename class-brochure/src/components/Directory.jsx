import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { students } from '../data/students'
import ProfileDrawer from './ProfileDrawer'
import './Directory.css'

// Build filter chips from whatever skills actually show up most in the
// data, instead of a hardcoded program split (there's only one programme).
function topSkillFilters(list, count = 5) {
  const freq = {}
  list.forEach((s) => s.technicalSkills.forEach((sk) => { freq[sk] = (freq[sk] || 0) + 1 }))
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([skill]) => skill)
}

export default function Directory() {
  const [query, setQuery] = useState('')
  const [activeSkill, setActiveSkill] = useState('all')
  const [activeStudent, setActiveStudent] = useState(null)

  const filters = useMemo(() => ['all', ...topSkillFilters(students)], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return students.filter((s) => {
      const matchesSkill = activeSkill === 'all' || s.technicalSkills.includes(activeSkill)
      if (!matchesSkill) return false
      if (!q) return true
      const haystack = [s.name, s.tagline, ...s.technicalSkills, ...s.professionalSkills]
        .join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [query, activeSkill])

  return (
    <section className="directory-section" id="directory">
      <p className="mono cohort-eyebrow directory-eyebrow">02 / MEET THE CLASS</p>
      <h2 className="directory-heading">Search by name, skill, or interest.</h2>

      <div className="directory-search-row">
        <div className="directory-search">
          <Search size={18} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search by name, skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="directory-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`directory-pill ${activeSkill === f ? 'active' : ''}`}
              onClick={() => setActiveSkill(f)}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <p className="mono directory-count">{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</p>

      <div className="directory-grid">
        <AnimatePresence>
          {filtered.map((s) => (
            <motion.button
              key={s.id}
              className="student-card"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveStudent(s)}
            >
              <div className="student-card-photo">
                <img src={s.photo} alt={s.name} loading="lazy" />
              </div>
              <div className="student-card-body">
                <h3>{s.name}</h3>
                <p className="student-card-tagline">{s.tagline}</p>
                <p className="student-card-skills">{s.technicalSkills.slice(0, 3).join(' · ')}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="directory-empty">No one matches that search yet — try a different skill or name.</p>
      )}

      <ProfileDrawer student={activeStudent} onClose={() => setActiveStudent(null)} />
    </section>
  )
}
