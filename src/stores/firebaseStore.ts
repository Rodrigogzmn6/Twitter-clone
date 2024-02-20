import { initializeApp, type FirebaseApp } from 'firebase/app'
import { create } from 'zustand'

const firebaseConfig = {
  apiKey: 'AIzaSyDHHCbfrLreIMmEneV_S021krIwoPwc3Ws',
  authDomain: 'twitter-clone-2cedb.firebaseapp.com',
  projectId: 'twitter-clone-2cedb',
  storageBucket: 'twitter-clone-2cedb.appspot.com',
  messagingSenderId: '958712133819',
  appId: '1:958712133819:web:37c75e54cd28023825519e',
  measurementId: 'G-NB94JNDQGY'
  // databaseURL: 'https://twitter-clone-2cedb-default-rtdb.firebaseio.com/' --> For real time database
}

interface FirebaseState {
  app: FirebaseApp
}

export const useFirebaseStore = create<FirebaseState>(() => {
  return {
    app: initializeApp(firebaseConfig)
  }
})
