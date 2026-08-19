import { useCallback, useState } from 'react'

const STORAGE_KEY = 'classBrochureFavorites.v1'

// Personal, browser-only shortlist — "star candidates while I'm
// browsing." Deliberately NOT synced through Firestore the way profile
// edits are: this is specific to whoever's looking right now, not
// something that should show up starred for every other visitor too.
function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function writeFavorites(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    // Private browsing / storage disabled — favoriting just won't
    // survive a reload in that case.
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  const toggleFavorite = useCallback((studentId) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(studentId)) next.delete(studentId)
      else next.add(studentId)
      writeFavorites(next)
      return next
    })
  }, [])

  return { favorites, toggleFavorite }
}
