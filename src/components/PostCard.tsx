import { Button, Divider } from '@nextui-org/react'
import { useState, type SetStateAction } from 'react'
import { useFirebaseStore } from '../stores/firebaseStore'
import { useUsersStore } from '../stores/usersStore'

export const PostCard = () => {
  const app = useFirebaseStore(state => state.app)
  const user = useUsersStore(state => state.user)
  const postTweet = useUsersStore(state => state.postTweet)
  const [tweet, setTweet] = useState('')

  const handleOnChangeTweet = (event: { target: { value: SetStateAction<string> } }) => {
    setTweet(event.target.value)
  }

  const handlePostTweet = () => {
    postTweet(app, tweet)
  }

  return (
    <div className='flex items-start gap-2 p-4 border-b border-secondary-text'>
      <img src={user?.profile} className='rounded-full h-12' />
      <div className='w-full flex flex-col items-end gap-4'>
        <textarea className='w-full resize-none bg-background text-xl' placeholder='Whats  happening' onChange={handleOnChangeTweet}/>
        <Divider />
        <Button radius='full' color='primary' onClick={handlePostTweet}>
          Post
        </Button>
      </div>
    </div>
  )
}
