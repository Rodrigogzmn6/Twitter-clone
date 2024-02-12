import { type ReactNode } from 'react'

interface PostButtonProps {
  icon: ReactNode
  title: string
}

export const PostButton: React.FC<PostButtonProps> = ({ icon, title }) => {
  return (
    <div className='cursor-pointer grid place-items-center bg-primary rounded-full p-3'>
      <button>
        {icon}
      </button>
      <p className='hidden'>{title}</p>
    </div>
  )
}
