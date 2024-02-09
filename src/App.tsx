import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { HomeRoute } from './routes/HomeRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute/>
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App

/* <main className='twitterTheme text-primary-text bg-background min-h-screen grid grid-cols-[1fr_5fr] lg:grid-cols-[1fr_5fr_3fr]'>
<LeftAside/>
<Center/>
<RightAside/>
</main>
</RouterProvider> */
