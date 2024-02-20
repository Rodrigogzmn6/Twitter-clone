import { useUsersStore } from '../stores/usersStore'

export const Avatar = () => {
  const user = useUsersStore(state => state.user)
  const logout = useUsersStore(state => state.logout)

  return (
    <div className='cursor-pointer rounded-full p-2 hover:bg-secondary-text' onClick={logout}>
      <img className="rounded-full" src={user?.profile}/>
    </div>
  )
}
