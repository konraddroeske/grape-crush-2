import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Category from '@components/products-page/selection-menu/Category'
import { selectGlobal } from '@redux/globalSlice'
import {
  handlePage,
  handleTags,
  resetTags,
  selectProducts,
} from '@redux/productsSlice'

const Menu: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { allTags } = useSelector(selectProducts())

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
      const { country, style, varietal, type, range } = allTags

      const sortedType = sortTags(type)
      const sortedCountry = sortTags(country)
      const sortedStyle = sortTags(style)
      const sortedVarietal = sortTags(varietal)
      const sortedPriceRange = sortPriceRange(range)

      setTypeOptions(sortedType)
      setCountryOptions(sortedCountry)
      setStyleOptions(sortedStyle)
      setVarietalOptions(sortedVarietal)
      setPriceRangeOptions(sortedPriceRange)
    }
  }, [allTags, locale])

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.values(router.query).length > 0) {
      const { page, ...tags } = router.query

      dispatch(handlePage(page))
      dispatch(handleTags(tags))
    } else {
      dispatch(resetTags())
    }
  }, [router, dispatch])

  return (
    <div className="w-full">
      <Category title="Type" category="type" tags={typeOptions} />
      <Category title="Style" category="style" tags={styleOptions} />
      <Category title="Price Range" category="range" tags={priceRangeOptions} />
      <Category title="Varietal" category="varietal" tags={varietalOptions} />
      <Category title="Country" category="country" tags={countryOptions} />
    </div>
  )
}

export default Menu
