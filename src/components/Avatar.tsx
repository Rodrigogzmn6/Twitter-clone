import { useUsersStore } from '../stores/usersStore'

export const Avatar = () => {
  const user = useUsersStore(state => state.user)
  return (
    <div className='cursor-pointer rounded-full p-2 hover:bg-secondary-text'>
      <img className="rounded-full" src={user?.profile}/>
    </div>
  )
}
