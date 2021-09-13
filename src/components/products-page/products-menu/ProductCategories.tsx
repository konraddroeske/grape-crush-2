import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import ProductsTags from '@components/products-page/products-bar/ProductsTags'
import Category from '@components/products-page/products-menu/Category'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

interface Props {
  closeMobileMenu?: () => void
}

const ProductCategories: FunctionComponent<Props> = (props) => {
  const { locale } = useSelector(selectGlobal())
  const { allTags } = useSelector(selectProducts())

  const [parentTypeOptions, setParentTypeOptions] = useState<string[]>([])
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [typeOptions, setTypeOptions] = useState<string[]>([])
  const [styleOptions, setStyleOptions] = useState<string[]>([])
  const [countryOptions, setCountryOptions] = useState<string[]>([])
  const [varietalOptions, setVarietalOptions] = useState<string[]>([])
  const [priceRangeOptions, setPriceRangeOptions] = useState<string[]>([])

  const sortTags = (tags: Record<string, number>) => {
    const sortedByQuantity = Object.entries(tags)
      .sort((a, b) => {
        return b[1] - a[1]
      })
      .map((tag) => tag[0])

    const mostPopular =
      sortedByQuantity.length > 14
        ? sortedByQuantity.slice(0, 14)
        : sortedByQuantity

    return mostPopular.sort()
  }

  const sortPriceRange = (tags: Record<string, number>) => {
    const ranges = Object.keys(tags).sort()

    return ranges.slice(-1).concat(ranges.slice(0, -1))
  }

  useEffect(() => {
    if (allTags) {
      const { parentType, category, type, country, style, varietal, range } =
        allTags

      const sortedParentType = sortTags(parentType)
      const sortedCategory = sortTags(category)
      const sortedType = sortTags(type)
      const sortedCountry = sortTags(country)
      const sortedStyle = sortTags(style)
      const sortedVarietal = sortTags(varietal)
      const sortedPriceRange = sortPriceRange(range)

      setParentTypeOptions(sortedParentType)
      setCategoryOptions(sortedCategory)
      setTypeOptions(sortedType)
      setCountryOptions(sortedCountry)
      setStyleOptions(sortedStyle)
      setVarietalOptions(sortedVarietal)
      setPriceRangeOptions(sortedPriceRange)
    }
  }, [allTags, locale])
  return (
    <div>
      <ProductsTags {...props} />
      <Category title="Type" category="parentType" tags={parentTypeOptions} />
      <Category title="Category" category="category" tags={categoryOptions} />
      <Category title="Featured" category="type" tags={typeOptions} />
      <Category title="Style" category="style" tags={styleOptions} />
      <Category title="Price Range" category="range" tags={priceRangeOptions} />
      <Category title="Varietal" category="varietal" tags={varietalOptions} />
      <Category title="Country" category="country" tags={countryOptions} />
    </div>
  )
}

export default ProductCategories
