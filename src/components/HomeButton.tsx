import { type ReactNode } from 'react'

interface HomeButtonProps {
  icon: ReactNode
}

export const HomeButton: React.FC<HomeButtonProps> = ({ icon }) => {
  return (
    <div className='cursor-pointer grid place-items-center rounded-full p-3 hover:bg-secondary-text'>
      <button>
        {icon}
      </button>
    </div>
  )
}
