// Real, shared per-student profile edits — backed by Firebase Firestore
// (see src/firebase.js) so a saved edit shows up for every visitor, not
// just the browser that made it.
//
// Security note: there's still no real authentication behind this. The
// "log in as email + shared password 7BCA1234" gate in EditProfileModal
// is a client-side check only — anything running in a browser can be
// read out of devtools, so it's a soft gate against casual editing, not
// a guarantee that only the right person can write a given document.
// Real protection would mean wiring up Firebase Authentication (e.g.
// email link sign-in) and matching Firestore rules to the signed-in
// user's email — a solid next step if this becomes a concern, but a
// bigger lift than "add a database," so it's flagged rather than
// silently built in.
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore'
import { db, firebaseReady } from '../firebase'

const COLLECTION = 'studentEdits'

// Shared password requested for every student's self-edit login.
export const EDIT_PASSWORD = '7BCA1234'

export function saveOverride(studentId, data) {
  if (!firebaseReady || !db) {
    return Promise.reject(
      new Error('The database isn’t configured yet (missing Firebase env vars), so this edit can’t be saved.')
    )
  }
  return setDoc(doc(db, COLLECTION, studentId), data, { merge: true })
}

// Subscribes to every saved edit at once and calls `callback` with a map
// of { [studentId]: overrideFields } whenever anything changes — used to
// live-update the directory grid and any open profile without a reload.
// Returns an unsubscribe function; if Firebase isn't configured, calls
// back with an empty map once and returns a no-op unsubscribe so the
// rest of the app can render normally (just without saved edits).
export function subscribeOverrides(callback) {
  if (!firebaseReady || !db) {
    callback({})
    return () => {}
  }
  return onSnapshot(
    collection(db, COLLECTION),
    (snap) => {
      const map = {}
      snap.forEach((d) => { map[d.id] = d.data() })
      callback(map)
    },
    (err) => {
      console.error('[studentOverrides] Firestore subscription failed:', err)
      callback({})
    }
  )
}

export function withOverrides(student, overridesMap) {
  const override = overridesMap?.[student.id]
  return override ? { ...student, ...override } : student
}

export function withOverridesList(students, overridesMap) {
  return students.map((s) => withOverrides(s, overridesMap))
}
