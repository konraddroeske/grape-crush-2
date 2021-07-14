import React, { FunctionComponent } from 'react'

import Selected from '../../../assets/svgs/box-selected.svg'
import Box from '../../../assets/svgs/box.svg'

interface OwnProps {
  title: string
  items: string[]
}

type Props = OwnProps

const Category: FunctionComponent<Props> = ({ title, items }) => {
  return (
    <div className="border-b border-blue pb-4 mb-4">
      <h3 className="text-2xl text-blue font-bold uppercase mb-3">{title}</h3>
      <ul>
        {items.map((item: string) => {
          return (
            <li key={item} className="mb-2">
              <button
                type="button"
                className="flex text-sm capitalize items-center"
              >
                <span className="flex items-center mr-3">
                  <Box />
                </span>
                <div className="flex items-center hidden mr-3">
                  <Selected />
                </div>
                <span className="flex items-center leading-none text-left whitespace-nowrap">
                  {item}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Category
