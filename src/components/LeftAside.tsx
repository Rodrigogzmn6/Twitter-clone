import { CommunitiesIcon, ExploreIcon, HomeIcon, ListsIcon, MessagesIcon, MoreIcon, NotificationsIcon, PostIcon, PremiumIcon, ProfileIcon, SavedIcon, XIcon } from '../icons/Icons'
import { Avatar } from './Avatar'
import { HomeButton } from './HomeButton'
import './LeftAside.css'
import { LeftAsideButton } from './LeftAsideButton'
import { PostButton } from './PostButton'

export const LeftAside = () => {
  return (
    <aside className='la flex flex-col gap-1 items-center sticky top-0 max-h-screen overflow-y-scroll'>
      <HomeButton icon={<XIcon/>}/>
      <LeftAsideButton icon={<HomeIcon />} title='Home'/>
      <LeftAsideButton icon={<ExploreIcon />} title='Explore'/>
      <LeftAsideButton icon={<NotificationsIcon />} title='Notifications'/>
      <LeftAsideButton icon={<MessagesIcon />} title='Messages'/>
      <LeftAsideButton icon={<ListsIcon />} title='Lists'/>
      <div className='hidden'>
        <LeftAsideButton icon={<SavedIcon />} title='Saved'/>
      </div>
      <div className='hidden'>
      <LeftAsideButton icon={<CommunitiesIcon />} title='Communities'/>
      </div>
      <LeftAsideButton icon={<PremiumIcon/>} title='Premium'/>
      <LeftAsideButton icon={<ProfileIcon />} title='Profile'/>
      <LeftAsideButton icon={<MoreIcon />} title='More Options'/>
      <PostButton icon={<PostIcon />} title='Post'/>
      <Avatar/>
    </aside>
  )
}

{ /* <aside className='la flex flex-col items-center justify-between justify-self-center py-2 px-4 sticky top-0 w-min
      md:justify-self-end md:px-6'>
      <div className='flex flex-col gap-2'>
        <HomeButton icon={<XIcon/>}/>
        <LeftAsideButton icon={<HomeIcon />} title='Home'/>
        <LeftAsideButton icon={<ExploreIcon />} title='Explore'/>
        <LeftAsideButton icon={<NotificationsIcon />} title='Notifications'/>
        <LeftAsideButton icon={<MessagesIcon />} title='Messages'/>
        <LeftAsideButton icon={<ListsIcon />} title='Lists'/>
        <LeftAsideButton icon={<SavedIcon />} title='Saved'/>
        <LeftAsideButton icon={<CommunitiesIcon />} title='Communities'/>
        <LeftAsideButton icon={<PremiumIcon/>} title='Premium'/>
        <LeftAsideButton icon={<ProfileIcon />} title='Profile'/>
        <LeftAsideButton icon={<MoreIcon />} title='More Options'/>
        <PostButton icon={<PostIcon />} title='More Options'/>
      </div>
      <Avatar/>
    </aside> */ }
