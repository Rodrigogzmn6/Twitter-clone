import { type ReactNode } from 'react'

interface LeftAsideButtonProps {
  icon: ReactNode
  title: string
}

export const LeftAsideButton: React.FC<LeftAsideButtonProps> = ({ icon, title }) => {
  return (
    <div className='cursor-pointer grid place-items-center rounded-full p-3 hover:bg-secondary-text'>
      <button>
        {icon}
      </button>
      <p className='hidden'>{title}</p>
    </div>
  )
}
