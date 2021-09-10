import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

interface OwnProps {
  category: string
  tag: string
  variant?: 'primary' | 'secondary'
}

type Props = OwnProps

const Tag: FunctionComponent<Props> = ({
  category,
  tag,
  variant = 'primary',
}) => {
  const router = useRouter()

  const handleClick = (newCategory: string, newTag: string) => {
    const href = `/products/?${encodeURIComponent(
      newCategory
    )}=${encodeURIComponent(newTag)}`
    router.push(href, href, { shallow: true })
  }

  const variants = {
    primary:
      'font-sans text-2xs font-light text-blue-dark py-1 px-3 uppercase bg-transparent border border-blue-dark hover:bg-lime',
    secondary:
      'font-sans text-2xs font-light py-2 px-4 rounded-3xl uppercase bg-transparent border border-lime',
  }

  return (
    <button
      type="button"
      className={variants[variant]}
      onClick={() => handleClick(category, tag)}
    >
      {tag}
    </button>
  )
}

export default Tag
