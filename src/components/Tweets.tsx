import { useEffect } from 'react'
import { useFirebaseStore } from '../stores/firebaseStore'
import { useUsersStore } from '../stores/usersStore'

export const Tweets = () => {
  const feed = useUsersStore(state => state.feed)
  const app = useFirebaseStore(state => state.app)
  const updateFeed = useUsersStore(state => state.updateFeed)

  useEffect(() => {
    updateFeed(app)
  }, [feed])

  return (
    feed?.map(tweet => (
      <p key={tweet.id}>{tweet.tweet}</p>
    ))
    // <p>test</p>
  )
}
