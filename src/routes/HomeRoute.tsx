import { useUsersStore } from '../stores/usersStore'
import { AppRoute } from './AppRoute'
import { WelcomeRoute } from './WelcomeRoute'

export const HomeRoute = () => {
  const user = useUsersStore(state => state.user)
  console.log(user)

  return (
    user != null ? <AppRoute/> : <WelcomeRoute/>
  )
}
