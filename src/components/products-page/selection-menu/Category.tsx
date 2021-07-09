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
    <div>
      <h3 className="text-2xl font-bold uppercase mb-2">{title}</h3>
      <ul>
        {items.map((item: string) => {
          return (
            <li key={item} className="mb-2">
              <button
                type="button"
                className="flex text-sm capitalize items-center"
              >
                <div className="flex items-center mr-3">
                  <Box />
                </div>
                <div className="flex items-center hidden mr-3">
                  <Selected />
                </div>
                <div className="flex items-center">{item}</div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Category
