import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import Category from '@components/products-page/selection-menu/Category'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const Menu: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { categories, allTags } = useSelector(selectProducts())

  const [typeOptions, setTypeOptions] = useState<string[]>([])
  const [styleOptions, setStyleOptions] = useState<string[]>([])
  const [countryOptions, setCountryOptions] = useState<string[]>([])
  const [varietalOptions, setVarietalOptions] = useState<string[]>([])

  const priceRanges = ['Under $20', '$20 to $30', '$30 to $50', '$50 to $100']

  const sortTags = (tags: Record<string, number>) => {
    const sorted = Object.entries(tags)
      .sort((a, b) => {
        return b[1] - a[1]
      })
      .map((tag) => tag[0])

    return sorted.length > 14 ? sorted.slice(0, 14) : sorted
  }

  useEffect(() => {
    if (categories) {
      const sortedTypes = categories.map((category) => {
        return category.title[locale]
      })

      setTypeOptions(sortedTypes)
    }

    if (allTags) {
      const { country, style, varietal } = allTags

      const sortedCountry = sortTags(country)
      const sortedStyle = sortTags(style)
      const sortedVarietal = sortTags(varietal)

      setCountryOptions(sortedCountry)
      setStyleOptions(sortedStyle)
      setVarietalOptions(sortedVarietal)
    }
  }, [allTags, locale, categories])

  return (
    <div className="w-full">
      <Category title="Type" items={typeOptions} />
      <Category title="Style" items={styleOptions} />
      <Category title="Price Range" items={priceRanges} />
      <Category title="Varietal" items={varietalOptions} />
      <Category title="Country" items={countryOptions} />
    </div>
  )
}

export default Menu
