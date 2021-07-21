import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import Selected from '@assets/svgs/box-selected.svg'
import Box from '@assets/svgs/box.svg'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

interface OwnProps {
  category: keyof TagsByCategory
  tag: string
}

type Props = OwnProps

const CategoryLink: FunctionComponent<Props> = ({ category, tag }) => {
  const router = useRouter()
  const { selectedTags } = useSelector(selectProducts())
  const [selected, setSelected] = useState(false)

  const getUpdatedTags = (
    categoryName: keyof TagsByCategory,
    tagName: string
  ) => {
    if (selectedTags[categoryName].includes(tagName)) {
      const categoryTags = selectedTags[category].filter(
        (categoryTag) => categoryTag !== tagName
      )

      return {
        ...selectedTags,
        [categoryName]: categoryTags,
      }
    }

    return {
      ...selectedTags,
      [categoryName]: [...selectedTags[category], tagName],
    }
  }

  const handleClick = (categoryName: keyof TagsByCategory, tagName: string) => {
    const updatedTags = getUpdatedTags(categoryName, tagName)

    const href = Object.entries(updatedTags).reduce((acc, cur) => {
      if (cur[1].length > 0) {
        const encoded = cur[1].map((ele) => encodeURIComponent(ele)).join()
        const join = acc === '/products/' ? '?' : '&'
        return `${acc}${join}${cur[0]}=${encoded}`
      }

      return acc
    }, '/products/')

    router.push(href, href, { shallow: true })
  }

  useEffect(() => {
    setSelected(selectedTags[category].includes(tag))
  }, [selectedTags, category, tag])

  return (
    <button
      type="button"
      className="font-sans flex text-sm capitalize items-center"
      onClick={() => handleClick(category, tag)}
    >
      {selected ? (
        <div className="flex items-center mr-3">
          <Selected />
        </div>
      ) : (
        <span className="flex items-center mr-3">
          <Box />
        </span>
      )}
      <span className="flex items-center leading-none text-left whitespace-nowrap">
        {tag}
      </span>
    </button>
  )
}

export default CategoryLink
