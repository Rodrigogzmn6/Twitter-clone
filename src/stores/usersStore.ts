import { type FirebaseApp } from 'firebase/app'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AUTH_ERROR_CREATE_USER_EMAIL, AUTH_ERROR_CREATE_USER_GOOGLE, AUTH_ERROR_LOGIN_USER, CREATE_USER_DB, FIRESTORE_DB_NAME, FIRESTORE_ERROR_CREATE_USER, FIRESTORE_ERROR_GET_USER, FIRESTORE_ERROR_LOGIN_USER, FIRESTORE_ERROR_POST, IMG_API_JSON_ERROR_CREATE_USER, IMG_API_RES_ERROR_CREATE_USER, LOCAL_STORAGE_ENTRY, LOGIN_USER, LOGOUT_USER, RANDOM_USER_API, RESTORE_ERROR, UPDATE_FEED } from '../constants/constants'
import { type Tweet, type User as TwitterUser } from '../types'

interface UserState {
  user?: TwitterUser
  error?: string
  feed?: Tweet[]
  restoreError: () => void
  createUserWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  createUserWithGoogle: (app: FirebaseApp) => Promise<void>
  // TODO: createUserWithApple
  loginWithEmail: (app: FirebaseApp, email: string, password: string) => Promise<void>
  logout: () => void
  postTweet: (app: FirebaseApp, tweet: string) => Promise<void>
  updateFeed: (app: FirebaseApp) => Promise<void>
  orderFeed: (feed: Tweet[]) => void
  listenFirebase: (app: FirebaseApp) => void
}

export const useUsersStore = create<UserState>()(devtools(persist((set, get) => {
  return {
    createUserWithEmail: async (app: FirebaseApp, email: string, password: string) => {
      const auth = getAuth(app)
      const db = getFirestore(app)

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          fetch(RANDOM_USER_API)
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
                    setDoc(doc(db, FIRESTORE_DB_NAME, userCredential.user.uid), {
                      ...newUser
                    })
                      .then(() => {
                        set(
                          {
                            user: {
                              ...newUser,
                              id: userCredential.user.uid
                            }
                          },
                          false,
                          CREATE_USER_DB
                        )
                      })
                      .catch(error => {
                        set(
                          { error: `Error ${error.code} - ${error.message}` },
                          false,
                          FIRESTORE_ERROR_CREATE_USER
                        )
                      })
                  }
                })
                .catch(error => {
                  set(
                    { error: `Error ${error.code} - ${error.message}` },
                    false,
                    IMG_API_JSON_ERROR_CREATE_USER
                  )
                })
            })
            .catch(error => {
              set(
                { error: `Error ${error.code} - ${error.message}` },
                false,
                IMG_API_RES_ERROR_CREATE_USER
              )
            })
        })
        .catch(error => {
          set(
            { error: `Error ${error.code} - ${error.message}` },
            false,
            AUTH_ERROR_CREATE_USER_EMAIL
          )
        })
    },

    createUserWithGoogle: async (app) => {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      const db = getFirestore(app)

      signInWithPopup(auth, provider)
        .then((result) => {
          fetch(RANDOM_USER_API)
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
                    setDoc(doc(db, FIRESTORE_DB_NAME, result.user.uid), {
                      ...newUser
                    })
                      .then(() => {
                        set(
                          {
                            user: {
                              ...newUser,
                              id: result.user.uid
                            }
                          },
                          false,
                          CREATE_USER_DB
                        )
                      })
                      .catch(error => {
                        set(
                          { error: `Error ${error.code} - ${error.message}` },
                          false,
                          FIRESTORE_ERROR_CREATE_USER
                        )
                      })
                  }
                })
                .catch(error => {
                  set(
                    { error: `Error ${error.code} - ${error.message}` },
                    false,
                    IMG_API_JSON_ERROR_CREATE_USER
                  )
                })
            })
            .catch(error => {
              set(
                { error: `Error ${error.code} - ${error.message}` },
                false,
                IMG_API_RES_ERROR_CREATE_USER
              )
            })
        })
        .catch(error => {
          set(
            { error: `Error ${error.code} - ${error.message}` },
            false,
            AUTH_ERROR_CREATE_USER_GOOGLE
          )
        })
    },

    loginWithEmail: async (app: FirebaseApp, email: string, password: string) => {
      const auth = getAuth()
      const db = getFirestore(app)

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user.email != null) {
            getDoc(doc(db, FIRESTORE_DB_NAME, userCredential.user.uid))
              .then((data) => {
                if (data.exists()) {
                  const loggedUser = {
                    email: data.data().email,
                    tweets: data.data().tweets,
                    friends: data.data().friends,
                    profile: data.data().profile
                  }
                  set(
                    {
                      user: {
                        ...loggedUser,
                        id: userCredential.user.uid
                      }
                    },
                    false,
                    LOGIN_USER)
                  get().updateFeed(app)
                }
              })
              .catch(error => {
                set(
                  { error: `Error ${error.code} - ${error.message}` },
                  false,
                  FIRESTORE_ERROR_LOGIN_USER
                )
              })
          }
        })
        .catch(error => {
          set({ error: `Error ${error.code} - ${error.message}` },
            false,
            AUTH_ERROR_LOGIN_USER
          )
        })
    },

    logout: () => {
      set(
        {
          user: undefined,
          error: undefined,
          feed: undefined
        },
        false,
        LOGOUT_USER
      )
    },

    restoreError: () => {
      set(
        { error: undefined },
        false,
        RESTORE_ERROR
      )
    },

    postTweet: async (app: FirebaseApp, tweet: string) => {
      const db = getFirestore(app)
      const loggedUser = get().user

      if (loggedUser != null) {
        const date = new Date()
        const id = crypto.randomUUID()

        // * Get the database list of tweets and add the new tweet
        getDoc(doc(db, FIRESTORE_DB_NAME, loggedUser.id))
          .then((data) => {
            if (data.exists()) {
              const newTweet = {
                id,
                userName: data.data().email,
                userProfile: data.data().profile,
                tweet,
                date
              }
              const tweets = [...data.data().tweets, newTweet]

              // * Update database with the new list of tweets
              updateDoc(doc(db, FIRESTORE_DB_NAME, loggedUser.id), {
                tweets
              })
                .then(() => {
                  get().updateFeed(app)
                })
                .catch(error => {
                  set(
                    { error: `Error ${error.code} - ${error.message}` },
                    false,
                    FIRESTORE_ERROR_POST
                  )
                })
            }
          })
          .catch(error => {
            set(
              { error: `Error ${error.code} - ${error.message}` },
              false,
              FIRESTORE_ERROR_GET_USER
            )
          })
      }
    },

    listenFirebase: (app: FirebaseApp) => {
      const loggedUser = get().user
      const db = getFirestore(app)

      if (loggedUser != null) {
        onSnapshot(doc(db, FIRESTORE_DB_NAME, loggedUser.id), (doc) => {
          get().updateFeed(app)
        })
      }
    },

    updateFeed: async (app: FirebaseApp) => {
      const loggedUser = get().user
      const db = getFirestore(app)
      let feed: Tweet[] = []

      if (loggedUser != null) {
        // * Get users tweets
        getDoc(doc(db, FIRESTORE_DB_NAME, loggedUser.id))
          .then(data => {
            if (data.exists()) {
              // * Retrieve users tweets
              feed = data.data().tweets

              if (loggedUser.friends.length > 0) {
              // * Retrieve user friends tweets
                loggedUser.friends.forEach(friendId => {
                  getDoc(doc(db, FIRESTORE_DB_NAME, friendId))
                    .then(data => {
                      if (data.exists()) {
                        data.data().tweets.forEach((tweet: Tweet) => {
                          feed = [...feed, tweet]
                        })
                      }
                      get().orderFeed(feed)
                    })
                    .catch(error => {
                      set(
                        { error: `Error ${error.code} - ${error.message}` },
                        false,
                        FIRESTORE_ERROR_GET_USER
                      )
                    })
                })
              } else {
                get().orderFeed(feed)
              }
            }
          })
          .catch(error => {
            set(
              { error: `Error ${error.code} - ${error.message}` },
              false,
              FIRESTORE_ERROR_GET_USER
            )
          })
      }
    },

    orderFeed: (feed: Tweet[]) => {
      if (feed != null) {
        feed.sort((a, b) => (b.date.seconds * 1000 + b.date.nanoseconds / 1000000) - (a.date.seconds * 1000 + a.date.nanoseconds / 1000000))
      }

      set(
        { feed },
        false,
        UPDATE_FEED
      )
    }

  }
}, { name: LOCAL_STORAGE_ENTRY })))
