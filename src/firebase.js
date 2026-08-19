import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase's web config isn't a secret — it just identifies which
// project to talk to; the actual protection is Firestore's security
// rules (see firestore.rules at the project root). Values come from
// Vite env vars so the real project isn't hardcoded into source — copy
// .env.example to .env.local and fill in the values from your Firebase
// project's web app settings (Project settings → General → Your apps).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

if (!firebaseReady && import.meta.env.DEV) {
  // Loud in the dev console rather than silently failing every save —
  // this is the #1 thing someone forgets after cloning the repo.
  console.warn(
    '[firebase] Missing VITE_FIREBASE_* env vars — profile self-edit will not be able to save. ' +
    'Copy .env.example to .env.local and fill in your Firebase project config.'
  )
}

const app = firebaseReady
  ? (getApps()[0] || initializeApp(firebaseConfig))
  : null

export const db = app ? getFirestore(app) : null
