import React, { FunctionComponent, useEffect, useState } from 'react'

import { sanitize } from 'dompurify'
import { useRouter } from 'next/router'

import Close from '@assets/svgs/close-rounded.svg'

interface OwnProps {
  url: string
  variant: 'clear' | 'link'
  tag: string
}

type Props = OwnProps

const CategoryTag: FunctionComponent<Props> = ({ url, variant, tag }) => {
  const router = useRouter()

  const variants = {
    clear: 'bg-lime',
    link: 'bg-white',
  }

  const [tagWithWordBreak, setTagWithWordBreak] = useState<string | null>(null)

  useEffect(() => {
    if (tag.includes('/')) {
      setTagWithWordBreak(tag.replace('/', '<wbr>/'))
    }
  }, [tag])

  return (
    <button
      type="button"
      className={`${variants[variant]} flex justify-between items-center text-left 
      text-blue-dark shadow-blue-dark border-blue-dark text-base font-bold uppercase h-8 px-3 border`}
      onClick={() =>
        router
          .push(url, url, { shallow: true })
          .then(() => window.scrollTo(0, 0))
      }
    >
      <span className="text-xs mr-2 h-8 overflow-hidden line-clamp">
        {tagWithWordBreak ? (
          <span
            className="text-left leading-8 line-clamp"
            dangerouslySetInnerHTML={{ __html: sanitize(tagWithWordBreak) }}
          />
        ) : (
          <span className="leading-8 line-clamp">{tag}</span>
        )}
      </span>
      <Close className="w-3 min-w-3" />
    </button>
  )
}

export default CategoryTag
