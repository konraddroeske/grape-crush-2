import React, { FunctionComponent } from 'react'

import CategoryLink from '@components/products-page/products-menu/CategoryLink'
import { TagsByCategory } from '@redux/productsSlice'

interface OwnProps {
  title: string
  category: keyof TagsByCategory
  tags: string[]
}

type Props = OwnProps

const Category: FunctionComponent<Props> = ({ title, category, tags }) => {
  return (
    <div className="border-b border-blue pb-4 mb-4">
      <h3 className="text-2xl text-blue font-bold uppercase mb-3">{title}</h3>
      <ul>
        {tags.map((tag: string) => {
          return (
            <li key={tag} className="mb-4">
              <CategoryLink category={category} tag={tag} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Category
