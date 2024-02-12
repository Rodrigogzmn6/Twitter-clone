import { PostCard } from './PostCard'
import { Tweets } from './Tweets'

export const Center = () => {
  return (
    <div className="border-l-1 border-r-1 border-secondary-text">
      <PostCard/>
      <Tweets/>
    </div>
  )
}
