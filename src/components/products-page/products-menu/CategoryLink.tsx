import React, { FunctionComponent, useEffect, useState } from 'react'

import { sanitize } from 'dompurify'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { convertTagsToHref } from '@lib/convertTagsToHref'
import { getUpdatedTags } from '@lib/getUpdatedTags'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

interface OwnProps {
  category: keyof TagsByCategory
  tag: string
  productCount: number
}

type Props = OwnProps

const CategoryLink: FunctionComponent<Props> = ({
  category,
  tag,
  productCount,
}) => {
  const router = useRouter()
  const { selectedTags } = useSelector(selectProducts())
  const [selected, setSelected] = useState(false)

  const handleClick = (categoryName: keyof TagsByCategory, tagName: string) => {
    const updatedTags = getUpdatedTags(selectedTags, categoryName, tagName)
    const href = convertTagsToHref(updatedTags)
    router.push(href, href, { shallow: true }).then(() => window.scrollTo(0, 0))
  }

  const [tagWithWordBreak, setTagWithWordBreak] = useState<string | null>(null)

  useEffect(() => {
    if (tag.includes('/')) {
      setTagWithWordBreak(tag.replace('/', '<wbr>/'))
    }
  }, [tag])

  useEffect(() => {
    setSelected(selectedTags[category].includes(tag))
  }, [selectedTags, category, tag])

  return (
    <button
      type="button"
      className={`${
        selected ? 'bg-lime' : 'bg-white'
      } h-7 px-2 py-1 border border-blue-tag font-sans flex items-center
      text-2xs text-blue-dark uppercase hover:bg-lime`}
      onClick={() => handleClick(category, tag)}
    >
      <span className="flex items-start mr-1 h-7 overflow-hidden">
        {tagWithWordBreak ? (
          <span
            className="text-left leading-7 line-clamp"
            dangerouslySetInnerHTML={{ __html: sanitize(tagWithWordBreak) }}
          />
        ) : (
          <span className="text-left leading-7 line-clamp">{tag}</span>
        )}
      </span>
      <span className="flex items-center h-7">({productCount})</span>
    </button>
  )
}

export default CategoryLink
