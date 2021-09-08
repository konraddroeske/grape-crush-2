import React, { FunctionComponent } from 'react'

import Fact from '@components/item-page/Fact'
import type { Facts } from '@components/item-page/ItemContent'

interface OwnProps {
  facts: Facts
}

type Props = OwnProps

const FactList: FunctionComponent<Props> = ({ facts }) => {
  return (
    <ul>
      {facts.map((fact, index) => {
        const [pair] = Object.entries(fact)
        const borderStyle =
          index === facts.length - 1 ? 'border-b-2 border-t-2' : 'border-t-2'
        const [category, value] = pair

        if (Array.isArray(value)) {
          const [ele] = value
          return (
            <li className={`${borderStyle} border-lime`} key={category}>
              <Fact category={category} value={ele} />
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
