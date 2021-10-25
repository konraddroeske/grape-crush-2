import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import Close from '@assets/svgs/close-rounded.svg'

interface OwnProps {
  url: string
  variant: 'clear' | 'link'
  children: React.ReactNode
}

type Props = OwnProps

const CategoryTag: FunctionComponent<Props> = ({ url, variant, children }) => {
  const router = useRouter()

  const variants = {
    clear: 'bg-lime',
    link: 'bg-white',
  }

  return (
    <button
      type="button"
      className={`${variants[variant]} flex justify-between items-center text-left 
      text-blue-dark shadow-blue-dark border-blue-dark text-base font-bold uppercase h-9 px-3 border`}
      onClick={() =>
        router
          .push(url, url, { shallow: true })
          .then(() => window.scrollTo(0, 0))
      }
    >
      <span className="text-xs mr-2">{children}</span>
      <Close className="w-3 min-w-3" />
    </button>
  )
}

export default CategoryTag
