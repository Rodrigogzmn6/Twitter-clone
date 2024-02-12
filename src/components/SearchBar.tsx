import { Input } from '@nextui-org/react'
import { SearchIcon } from '../icons/Icons'

export const SearchBar = () => {
  return (
    <form className="flex flex-col items-stretch">
      <Input
        classNames={{
          inputWrapper: [
            'h-0'
          ],
          input: [
            'text-secondary-text'
          ],
          innerWrapper: [
            'gap-2'
          ]
        }}
        radius='full' type='text' placeholder='Search' startContent={<SearchIcon width={24} height={24}/>}/>
    </form>
  )
}
