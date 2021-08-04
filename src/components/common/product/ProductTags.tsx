import React, { FunctionComponent, useEffect, useState } from 'react'

import Tag from '@components/common/Tag'

interface OwnProps {
  country: string[]
  style: string[]
  varietal: string[]
  variant: 'primary' | 'secondary'
}

type Props = OwnProps

const ProductTags: FunctionComponent<Props> = ({
  country,
  style,
  varietal,
  variant,
}) => {
  const [pairs, setPairs] = useState<string[][]>([])

  const getTags = (arr: string[], category: string, amount: number) => {
    const tagsOnly = arr.length >= amount ? arr.slice(0, amount) : arr
    return tagsOnly.map((singleTag) => [category, singleTag])
  }

  useEffect(() => {
    const primaryCountry = getTags(country, 'country', 1)
    const primaryVarietal = getTags(varietal, 'varietal', 1)
    const primaryStyles = getTags(style, 'style', 2)

    const mergedPairs = [
      ...primaryCountry,
      ...primaryVarietal,
      ...primaryStyles,
    ]

    setPairs(mergedPairs)
  }, [country, style, varietal])

  return (
    <ul className="flex flex-wrap mt-4 mb-2">
      {pairs.map((pair) => {
        const [category, tag] = pair
        return (
          <li key={tag} className="mr-2 mb-2">
            <Tag category={category} tag={tag} variant={variant} />
          </li>
        )
      })}
    </ul>
  )
}

export default ProductTags
