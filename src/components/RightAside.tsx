import { SearchBar } from './SearchBar'
import { SuscribeCard } from './SuscribeCard'
import { TrendsCard } from './TrendsCard'

export const RightAside = () => {
  return (
    <div className="hidden justify-self-stretch lg:flex lg:flex-col lg:items-stretch gap-3 py-2 px-6">
      <SearchBar/>
      <SuscribeCard/>
      <TrendsCard/>
    </div>
  )
}
