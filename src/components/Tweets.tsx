import { useEffect } from 'react'
import { useFirebaseStore } from '../stores/firebaseStore'
import { useUsersStore } from '../stores/usersStore'
import { Tweet } from './Tweet'

export const Tweets = () => {
  const feed = useUsersStore(state => state.feed)
  const updateFeed = useUsersStore(state => state.updateFeed)
  const app = useFirebaseStore(state => state.app)

  useEffect(() => {
    updateFeed(app)
  }, [])

  return (
    feed?.map((tweet) => (
      <Tweet key={tweet.id} tweet={tweet}/>
    ))
  )
}
