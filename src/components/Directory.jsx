import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star } from 'lucide-react'
import { students } from '../data/students'
import { withOverridesList } from '../utils/studentOverrides'
import { useOverrides } from '../context/OverridesContext'
import { useFavorites } from '../utils/favorites'
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

export default function Directory({ onSelectStudent }) {
  const [query, setQuery] = useState('')
  const [activeSkill, setActiveSkill] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  // Live map of { studentId: editedFields } from Firestore (see
  // OverridesContext) — layered on top of the base data so a self-edit
  // shows up in the grid for every visitor, in real time, without a
  // reload.
  const overrides = useOverrides()
  const roster = useMemo(() => withOverridesList(students, overrides), [overrides])

  // Starring is a personal browsing aid (browser-local, see
  // utils/favorites.js) — not synced anywhere, unlike the overrides above.
  const { favorites, toggleFavorite } = useFavorites()

  const filters = useMemo(() => ['all', ...topSkillFilters(roster)], [roster])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return roster.filter((s) => {
      if (favoritesOnly && !favorites.has(s.id)) return false
      const matchesSkill = activeSkill === 'all' || s.technicalSkills.includes(activeSkill)
      if (!matchesSkill) return false
      if (!q) return true
      const haystack = [s.name, s.tagline, ...s.technicalSkills, ...s.professionalSkills]
        .join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [query, activeSkill, roster, favoritesOnly, favorites])

  return (
    <section className="directory-section" id="directory">
      <p className="mono cohort-eyebrow directory-eyebrow">03 / MEET THE CLASS</p>
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
          <motion.button
            className={`directory-pill directory-pill-favorites ${favoritesOnly ? 'active' : ''}`}
            onClick={() => setFavoritesOnly((v) => !v)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <Star size={13} fill={favoritesOnly ? 'currentColor' : 'none'} />
            Favorites{favorites.size > 0 ? ` (${favorites.size})` : ''}
          </motion.button>

          {filters.map((f) => (
            <motion.button
              key={f}
              className={`directory-pill ${activeSkill === f ? 'active' : ''}`}
              onClick={() => setActiveSkill(f)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
            >
              {f === 'all' ? 'All' : f}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="mono directory-count">{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</p>

      <div className="directory-grid">
        <AnimatePresence>
          {filtered.map((s, i) => (
            <motion.button
              key={s.id}
              className="student-card"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.035, 0.3), ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelectStudent(s)}
            >
              <button
                type="button"
                className={`student-card-star ${favorites.has(s.id) ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleFavorite(s.id) }}
                aria-label={favorites.has(s.id) ? `Remove ${s.name} from favorites` : `Add ${s.name} to favorites`}
                aria-pressed={favorites.has(s.id)}
              >
                <Star size={16} fill={favorites.has(s.id) ? 'currentColor' : 'none'} />
              </button>

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

      {filtered.length === 0 && favoritesOnly && (
        <p className="directory-empty">No favorites yet. Click the star on a card to shortlist someone.</p>
      )}
      {filtered.length === 0 && !favoritesOnly && (
        <p className="directory-empty">No one matches that search yet. Try a different skill or name.</p>
      )}
    </section>
  )
}
