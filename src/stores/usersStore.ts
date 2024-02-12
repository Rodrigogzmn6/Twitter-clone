import { type FirebaseApp } from 'firebase/app'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type User as TwitterUser } from '../types'

interface UserState {
  user?: TwitterUser
  error?: string
  restoreError: () => void
  createUserWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  createUserWithGoogle: (app: FirebaseApp) => Promise<void>
  // TODO: createUserWithApple
  loginWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  // TODO: logOut
  feed?: string[]
  updateFeed: () => Promise<void>
  postTweet: (app: FirebaseApp, tweet: string) => Promise<void>
}

export const useUsersStore = create<UserState>()(persist((set, get) => {
  return {
    createUserWithEmail: async (app: FirebaseApp, email: string, password: string) => {
      const auth = getAuth(app)
      const db = getFirestore(app)

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          fetch('https://randomuser.me/api/')
            .then((res) => {
              res.json()
                .then((data) => {
                  if (userCredential.user.email != null) {
                    const newUser = {
                      email: userCredential.user.email,
                      tweets: [],
                      friends: [],
                      profile: data.results[0].picture.medium
                    }
                    setDoc(doc(db, 'users', userCredential.user.uid), {
                      ...newUser
                    })
                      .then(() => {
                        set({
                          user: {
                            ...newUser,
                            id: userCredential.user.uid
                          }
                        })
                      })
                      .catch((error) => {
                        set({
                          error: `Error ${error.code} - ${error.message}`
                        })
                      })
                  }
                })
                .catch((error) => {
                  set({
                    error: `Error ${error.code} - ${error.message}`
                  })
                })
            })
            .catch((error) => {
              set({
                error: `Error ${error.code} - ${error.message}`
              })
            })
        })
        .catch((error) => {
          set({
            error: `Error ${error.code} - ${error.message}`
          })
        })
    },

    createUserWithGoogle: async (app) => {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      const db = getFirestore(app)

      signInWithPopup(auth, provider)
        .then((result) => {
          fetch('https://randomuser.me/api/')
            .then((res) => {
              res.json()
                .then((data) => {
                  if (result.user.email != null) {
                    const newUser = {
                      email: result.user.email,
                      tweets: [],
                      friends: [],
                      profile: data.results[0].picture.medium
                    }
                    setDoc(doc(db, 'users', result.user.uid), {
                      ...newUser
                    })
                      .then(() => {
                        set({
                          user: {
                            ...newUser,
                            id: result.user.uid
                          }
                        })
                      })
                      .catch((error) => {
                        set({
                          error: `Error ${error.code} - ${error.message}`
                        })
                      })
                  }
                })
                .catch((error) => {
                  set({
                    error: `Error ${error.code} - ${error.message}`
                  })
                })
            })
            .catch((error) => {
              set({
                error: `Error ${error.code} - ${error.message}`
              })
            })
        })
        .catch((error) => {
          set({
            error: `Error ${error.code} - ${error.message}`
          })
        })
    },

    loginWithEmail: async (app: FirebaseApp, email: string, password: string) => {
      const auth = getAuth()
      const db = getFirestore(app)

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user.email != null) {
            getDoc(doc(db, 'users', userCredential.user.uid))
              .then((data) => {
                if (data.exists()) {
                  const loggedUser = {
                    email: data.data().email,
                    tweets: data.data().tweets,
                    friends: data.data().friends,
                    profile: data.data().profile
                  }
                  set({
                    user: {
                      ...loggedUser,
                      id: userCredential.user.uid
                    }
                  })
                }
              })
              .catch((error) => {
                set({
                  error: `Error ${error.code} - ${error.message}`
                })
              })
          }
        })
        .catch((error) => {
          set({
            error: `Error ${error.code} - ${error.message}`
          })
        })
    },

    restoreError: () => {
      set({
        error: undefined
      })
    },

    updateFeed: async () => {
      const loggedUser = get().user
      if (loggedUser != null) {
        set({ feed: loggedUser.tweets })
      //   loggedUser.friends.forEach(friend => {
      //     set({
      //       feed: [...friend.tweets]
      //     })
      //   })
      }
    },

    postTweet: async (app: FirebaseApp, tweet: string) => {
      const db = getFirestore(app)
      const loggedUser = get().user

      if (loggedUser != null) {
        const tweets = [...loggedUser.tweets, tweet]
        updateDoc(doc(db, 'users', loggedUser.id), {
          tweets
        })
          .then(() => {
            set({
              user: {
                ...loggedUser,
                tweets
              }
            })
          }

          )
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}, { name: 'user' }))

// _document.data.value.mapValue.fields
