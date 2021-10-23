import React, { FunctionComponent } from 'react'

import Fact from '@components/item-page/Fact'
import type { Facts } from '@components/item-page/ItemContent'

interface OwnProps {
  facts: Facts
}

type Props = OwnProps

const FactList: FunctionComponent<Props> = ({ facts }) => {
  const filtered = facts.filter((fact) => {
    const [factArr] = Object.entries(fact)
    const [, value] = factArr

    if (value instanceof Array) {
      return value.length > 0
    }

    return !!value
  })

  return (
    <ul>
      {filtered.map((fact, index) => {
        const [pair] = Object.entries(fact)
        const borderStyle =
          index === filtered.length - 1 ? 'border-b-2 border-t-2' : 'border-t-2'
        const [category, value] = pair

        if (value instanceof Array) {
          const stringFromArr = value.toString().replace(',', '/')

          return (
            <li className={`${borderStyle} border-lime`} key={category}>
              <Fact category={category} value={stringFromArr} />
            </li>
          )
        }

        return (
          <li className={`${borderStyle} border-lime`} key={category}>
            <Fact category={category} value={value} />
          </li>
        )
      })}
    </ul>
  )
}

export default FactList
