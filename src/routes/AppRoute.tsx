import { Center } from '../components/Center'
import { LeftAside } from '../components/LeftAside'
import { RightAside } from '../components/RightAside'

export const AppRoute = () => {
  return (
    <main className='twitterTheme text-primary-text bg-background min-h-screen h-full grid grid-cols-[1fr_5fr]
      md:grid-cols-[1fr_6fr]'>
      <LeftAside/>
      <Center/>
      <RightAside/>
    </main>
  )
}
