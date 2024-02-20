import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app'
import { create } from 'zustand'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const firebaseConfig: FirebaseOptions = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)

interface FirebaseState {
  app: FirebaseApp
}

export const useFirebaseStore = create<FirebaseState>(() => {
  return {
    app: initializeApp(firebaseConfig)
  }
})
