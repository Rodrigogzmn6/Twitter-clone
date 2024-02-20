import { useDateHook } from '../hooks/dateHook'
import { type Tweet as TweetType } from '../types'

interface Props {
  tweet: TweetType
}

export const Tweet = ({ tweet }: Props) => {
  const { getTweetTime } = useDateHook()

  return (
    <div className='border-b border-secondary-text flex gap-2 items-start px-6 py-4'>
      <img className='h-12 rounded-full' src={tweet.userProfile} />
      <div className='flex flex-col'>
        <div className='flex gap-2'>
          <h4 className='font-bold'>{tweet.userName}</h4>
          <p className='text-secondary-text'>{tweet.userName} - {getTweetTime(tweet)}</p>
        </div>
        <p>{tweet.tweet}</p>
      </div>
    </div>
  )
}
