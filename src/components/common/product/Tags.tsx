import React, { FunctionComponent, useEffect, useState } from 'react'

import Tag from '@components/common/Tag'

interface OwnProps {
  country: string[]
  style: string[]
  varietal: string[]
  variant?: 'card' | 'item'
}

type Props = OwnProps

const Tags: FunctionComponent<Props> = ({
  country,
  style,
  varietal,
  variant = 'card',
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

  const ulVariant = {
    card: 'flex flex-wrap justify-start mt-2',
    item: 'flex flex-wrap justify-center lg:justify-start',
  }

  const liVariant = {
    card: 'mr-2 mb-2',
    item: 'mx-1 lg:mx-0 lg:mr-2 mb-2',
  }

  return (
    <>
      {pairs.length > 0 && (
        <ul className={ulVariant[variant]}>
          {pairs.map((pair) => {
            const [category, tag] = pair
            return (
              <li key={tag} className={liVariant[variant]}>
                {/* <Tag category={category} tag={tag} variant={variant} /> */}
                <Tag category={category} tag={tag} />
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Tags
