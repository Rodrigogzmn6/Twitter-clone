import { useEffect } from 'react'
import { useUsersStore } from '../stores/usersStore'

export const Tweets = () => {
  const feed = useUsersStore(state => state.feed)
  const updateFeed = useUsersStore(state => state.updateFeed)

  useEffect(() => {
    updateFeed()
  }, [feed])

  return (
    <div>
      {feed}
    </div>
  )
}
