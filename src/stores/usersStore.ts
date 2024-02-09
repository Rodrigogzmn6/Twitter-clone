import { type FirebaseApp } from 'firebase/app'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type User as TwitterUser } from '../types'

interface UserState {
  user?: TwitterUser
  createUserWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  createUserWithGoogle: (app: FirebaseApp) => Promise<void>
  // TODO: createUserWithApple
}

export const useUsersStore = create<UserState>()(persist((set) => {
  return {
    createUserWithEmail: async (app: FirebaseApp, email: string, password: string) => {
      const auth = getAuth(app)
      const db = getFirestore(app)

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user.email != null) {
            const newUser = {
              email: userCredential.user.email,
              tweets: []
            }
            setDoc(doc(db, 'users', userCredential.user.uid), {
              ...newUser
            }).then(() => {
              set({
                user: {
                  ...newUser,
                  id: userCredential.user.uid
                }
              })
            }).catch((error) => {
              console.log(error.message)
            })
          }
        })
        .catch((error) => {
          console.log(`Error ${error.code} - ${error.message}`)
        })
    },

    createUserWithGoogle: async (app) => {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      const db = getFirestore(app)

      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)

          if (result.user.email != null) {
            const newUser = {
              email: result.user.email,
              tweets: []
            }
            setDoc(doc(db, 'users', result.user.uid), {
              ...newUser
            }).then(() => {
              set({
                user: {
                  ...newUser,
                  id: result.user.uid
                }
              })
            }).catch((error) => {
              console.log(error.message)
            })
          }
        })
        .catch((error) => {
          console.log(`Error ${error.code} - ${error.message}`)
        })
    }
  }
}, { name: 'user' }))
