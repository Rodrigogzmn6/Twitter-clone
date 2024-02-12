import { Center } from '../components/Center'
import { LeftAside } from '../components/LeftAside'
import { RightAside } from '../components/RightAside'

export const AppRoute = () => {
  return (
    <main className='twitterTheme text-primary-text bg-background min-h-screen grid grid-cols-[1fr_5fr] lg:grid-cols-[1fr_5fr_3fr]'>
      <LeftAside/>
      <Center/>
      <RightAside/>
    </main>
  )
}
