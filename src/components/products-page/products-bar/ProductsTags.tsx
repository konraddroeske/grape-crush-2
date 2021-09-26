import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import CategoryTag from '@components/products-page/products-menu/CategoryTag'

import { convertTagsToHref } from '@lib/convertTagsToHref'
import { getUpdatedTags } from '@lib/getUpdatedTags'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

import Close from '../../../assets/svgs/close-rounded.svg'

interface Props {
  closeMobileMenu?: () => void
}

const ProductsTags: FunctionComponent<Props> = ({ closeMobileMenu }) => {
  const { selectedTags } = useSelector(selectProducts())
  const [categoryTagTuples, setCategoryTagTuples] = useState<
    [keyof TagsByCategory, string][] | []
  >([])

  useEffect(() => {
    const flattened = Object.entries(selectedTags).reduce((acc, cur) => {
      const [category, categoryTags] = cur
      if (categoryTags.length === 0) return acc
      const elements = categoryTags.map((tag: string) => [category, tag])
      return acc.concat(elements)
    }, [] as [keyof TagsByCategory, string][])

    setCategoryTagTuples(flattened)
  }, [selectedTags])

  const getHref = (categoryName: keyof TagsByCategory, tagName: string) => {
    const updatedTags = getUpdatedTags(selectedTags, categoryName, tagName)
    return convertTagsToHref(updatedTags)
  }

  return (
    <div className="pb-6">
      <div className="flex justify-end mb-3 lg:mb-0">
        <button
          type="button"
          className="flex justify-center items-center w-10 h-10 rounded-full bg-lime lg:hidden"
          onClick={() => (closeMobileMenu ? closeMobileMenu() : null)}
        >
          <Close className="w-4 svg-close-position" />
        </button>
      </div>
      <ul className="flex flex-wrap">
        <li className="mr-2 mb-2">
          <CategoryTag variant="clear" url="/products?page=1">
            Clear filters
          </CategoryTag>
        </li>
        {categoryTagTuples?.length > 0 &&
          categoryTagTuples.map(([category, tag]) => {
            return (
              <li key={`${category}-${tag}`} className="mr-2 mb-2">
                <CategoryTag url={getHref(category, tag)} variant="link">
                  {tag}
                </CategoryTag>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default ProductsTags
