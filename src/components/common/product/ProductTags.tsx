import React, { FunctionComponent, useEffect, useState } from 'react'

import Tag from '@components/common/Tag'

interface OwnProps {
  country: string[]
  style: string[]
  varietal: string[]
}

type Props = OwnProps

const ProductTags: FunctionComponent<Props> = ({
  country,
  style,
  varietal,
}) => {
  const [tags, setTags] = useState<string[]>([])

  const getTags = (arr: string[], amount: number) => {
    return arr.length >= amount ? arr.slice(0, amount) : arr
  }

  useEffect(() => {
    const primaryCountry = getTags(country, 1)
    const primaryVarietal = getTags(varietal, 1)
    const primaryStyles = getTags(style, 2)

    const mergedTags = [...primaryCountry, ...primaryVarietal, ...primaryStyles]

    setTags(mergedTags)
  }, [country, style, varietal])

  return (
    <ul className="flex flex-wrap mt-4 mb-2">
      {tags.map((tag) => {
        return (
          <li key={tag} className="mr-2 mb-2">
            <Tag>{tag}</Tag>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductTags
