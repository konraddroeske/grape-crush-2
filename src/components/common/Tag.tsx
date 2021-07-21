import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

interface OwnProps {
  category: string
  tag: string
}

type Props = OwnProps

const Tag: FunctionComponent<Props> = ({ category, tag }) => {
  const router = useRouter()

  const handleClick = (newCategory: string, newTag: string) => {
    const href = `/products/?${newCategory}=${newTag}`

    router.push(href, href, { shallow: true })
  }
  return (
    <button
      type="button"
      className="font-sans text-2xs font-light py-2 px-4 rounded-3xl uppercase bg-lime-lightest"
      onClick={() => handleClick(category, tag)}
    >
      {tag}
    </button>
  )
}

export default Tag
