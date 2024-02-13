import { type FirebaseApp } from 'firebase/app'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Tweet, type User as TwitterUser } from '../types'

interface UserState {
  user?: TwitterUser
  error?: string
  restoreError: () => void
  createUserWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  createUserWithGoogle: (app: FirebaseApp) => Promise<void>
  // TODO: createUserWithApple
  loginWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  logout: () => void
  // TODO: logOut
  feed?: Tweet[]
  updateFeed: (app: FirebaseApp) => Promise<void>
  postTweet: (app: FirebaseApp, tweet: string) => Promise<void>
}

export const useUsersStore = create<UserState>()(devtools(persist((set, get) => {
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
                        }, false, 'CREATE_USER_EMAIL')
                      })
                      .catch(error => {
                        set({ error: `Error ${error.code} - ${error.message}` })
                      })
                  }
                })
                .catch(error => {
                  set({
                    error: `Error ${error.code} - ${error.message}`
                  })
                })
            })
            .catch(error => {
              set({
                error: `Error ${error.code} - ${error.message}`
              })
            })
        })
        .catch(error => {
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
                        }, false, 'CREATE_USER_GOOGLE')
                      })
                      .catch(error => {
                        set({
                          error: `Error ${error.code} - ${error.message}`
                        })
                      })
                  }
                })
                .catch(error => {
                  set({
                    error: `Error ${error.code} - ${error.message}`
                  })
                })
            })
            .catch(error => {
              set({
                error: `Error ${error.code} - ${error.message}`
              })
            })
        })
        .catch(error => {
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
                  }, false, 'LOGIN_USER')
                  console.log(get().user)
                }
              })
              .catch(error => {
                set({
                  error: `Error ${error.code} - ${error.message}`
                })
              })
          }
        })
        .catch(error => {
          set({
            error: `Error ${error.code} - ${error.message}`
          })
        })
    },

    logout: () => {
      set({
        user: undefined
      })
    },

    restoreError: () => {
      set({
        error: undefined
      })
    },

    postTweet: async (app: FirebaseApp, tweet: string) => {
      const db = getFirestore(app)
      const loggedUser = get().user

      if (loggedUser != null) {
        // * Update feed in local storage
        const date = new Date()
        const id = crypto.randomUUID()
        const tweets: Tweet[] = [...loggedUser.tweets, { id, userName: loggedUser.email, userProfile: loggedUser.profile, tweet, date }]
        set({
          user: {
            ...loggedUser,
            tweets
          }
        })

        // * Update database
        updateDoc(doc(db, 'users', loggedUser.id), {
          tweets
        })
          .then()
          // * If it can't be updated, delete the last tweet
          .catch(error => {
            const newTweets = tweets.filter(tweet => tweet.id !== id)
            set({
              user: {
                ...loggedUser,
                tweets: newTweets
              },
              error: `Error ${error.code} - ${error.message}`
            })
            console.log(tweets)
          })
          .finally(() => {
            get().updateFeed(app)
          })
      }
    },

    updateFeed: async (app: FirebaseApp) => {
      const loggedUser = get().user
      const db = getFirestore(app)

      if (loggedUser != null) {
        getDoc(doc(db, 'users', loggedUser.id))
          .then(data => {
            if (data.exists()) {
              set({
                feed: loggedUser.tweets
              })
            }
          })
          .catch(error => {
            set({
              error: `Error ${error.code} - ${error.message}`
            })
          })
      }
    }
  }
}, { name: 'user' })))

// _document.data.value.mapValue.fields
