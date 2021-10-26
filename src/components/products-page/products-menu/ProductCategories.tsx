import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import Category from '@components/products-page/products-menu/Category'
import { cleanString } from '@lib/sortProducts'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

interface Props {
  closeMobileMenu?: () => void
}

interface TagOptions {
  parentType: string[]
  category: string[]
  type: string[]
  style: string[]
  country: string[]
  varietal: string[]
  priceRange: string[]
}

const ProductCategories: FunctionComponent<Props> = () => {
  const { locale } = useSelector(selectGlobal())
  const { allTags } = useSelector(selectProducts())

  const [tagOptions, setTagOptions] = useState<TagOptions | null>(null)

  const sortCount = (tags: Record<string, number>) => {
    return Object.entries(tags)
      .sort((a, b) => {
        return b[1] - a[1]
      })
      .map((tag) => tag[0])
  }

  const sortAlphabetically = (tags: Record<string, number>) => {
    return Object.entries(tags)
      .sort((a, b) => {
        return cleanString(a[0]).localeCompare(b[0])
      })
      .map((tag) => tag[0])
  }

  const sortPriceRange = (tags: Record<string, number>) => {
    const ranges = Object.keys(tags).sort()

    return ranges.slice(-1).concat(ranges.slice(0, -1))
  }

  useEffect(() => {
    if (allTags) {
      const { parentType, category, type, country, style, varietal, range } =
        allTags

      setTagOptions({
        parentType: sortCount(parentType),
        category: sortAlphabetically(category),
        type: sortAlphabetically(type),
        style: sortAlphabetically(style),
        country: sortAlphabetically(country),
        varietal: sortAlphabetically(varietal),
        priceRange: sortPriceRange(range),
      })
    }
  }, [allTags, locale])

  return (
    <div id="product-categories">
      {tagOptions && (
        <>
          <Category
            title="Type"
            category="parentType"
            tags={tagOptions.parentType}
          />
          <Category
            title="Category"
            category="category"
            tags={tagOptions.category}
          />
          <Category title="Featured" category="type" tags={tagOptions.type} />
          <Category title="Style" category="style" tags={tagOptions.style} />
          <Category
            title="Price Range"
            category="range"
            tags={tagOptions.priceRange}
          />
          <Category
            title="Country"
            category="country"
            tags={tagOptions.country}
          />
          <Category
            title="Varietal"
            category="varietal"
            tags={tagOptions.varietal}
          />
        </>
      )}
    </div>
  )
}

export default ProductCategories
