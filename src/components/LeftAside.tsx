import { ExploreIcon, HomeIcon, ListsIcon, MessagesIcon, MoreIcon, NotificationsIcon, PostIcon, ProfileIcon, XIcon } from '../icons/Icons'
import { Avatar } from './Avatar'
import { HomeButton } from './HomeButton'
import { LeftAsideButton } from './LeftAsideButton'
import { PostButton } from './PostButton'

export const LeftAside = () => {
  return (
    <aside className='flex flex-col justify-between justify-self-center items-center py-2 px-4 w-min'>
      <div>
        <HomeButton icon={<XIcon/>}/>
        <LeftAsideButton icon={<HomeIcon width={26} height={26}/>} title='Home'/>
        <LeftAsideButton icon={<ExploreIcon width={26} height={26}/>} title='Explore'/>
        <LeftAsideButton icon={<NotificationsIcon width={26} height={26}/>} title='Notifications'/>
        <LeftAsideButton icon={<MessagesIcon width={26} height={26}/>} title='Messages'/>
        <LeftAsideButton icon={<ListsIcon width={26} height={26}/>} title='Lists'/>
        <div className='hidden'>
          <LeftAsideButton icon={<XIcon/>} title='Premium'/>
        </div>
        <LeftAsideButton icon={<ProfileIcon width={26} height={26}/>} title='Profile'/>
        <LeftAsideButton icon={<MoreIcon width={26} height={26}/>} title='More Options'/>
        <PostButton icon={<PostIcon width={26} height={26}/>} title='More Options'/>
      </div>
      <Avatar/>
    </aside>
  )
}
