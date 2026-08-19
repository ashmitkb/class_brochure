import { createContext, useContext, useEffect, useState } from 'react'
import { subscribeOverrides } from '../utils/studentOverrides'

const OverridesContext = createContext({})

// Subscribes to the studentEdits collection exactly once at the top of
// the app and hands the live map down to whoever needs it (Directory for
// the grid, StudentProfile for the page currently open) — so an edit
// saved on one screen shows up on the other without a page reload.
export function OverridesProvider({ children }) {
  const [overrides, setOverrides] = useState({})

  useEffect(() => {
    const unsubscribe = subscribeOverrides(setOverrides)
    return unsubscribe
  }, [])

  return (
    <OverridesContext.Provider value={overrides}>
      {children}
    </OverridesContext.Provider>
  )
}

export function useOverrides() {
  return useContext(OverridesContext)
}
