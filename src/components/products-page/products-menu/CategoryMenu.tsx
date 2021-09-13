import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { useMediaQuery } from 'react-responsive'

import type { TagsWithProducts } from '@components/products-page/products-menu/Category'
import CategoryLink from '@components/products-page/products-menu/CategoryLink'

import type { TagsByCategory } from '@redux/productsSlice'

interface OwnProps {
  category: keyof TagsByCategory
  menuOpen: boolean
  tagsWithProducts: TagsWithProducts[]
}

type Props = OwnProps

const CategoryMenu: FunctionComponent<Props> = ({
  category,
  menuOpen,
  tagsWithProducts,
}) => {
  const isSmall = useMediaQuery({ query: '(min-width: 640px)' })

  const [scrollHeight, setScrollHeight] = useState<number>(0)
  const menuRef = useRef<null | HTMLUListElement>(null)

  const handleScrollHeight = () => {
    setScrollHeight(menuRef?.current?.scrollHeight || 0)
  }

  useEffect(() => {
    handleScrollHeight()
  }, [menuOpen, isSmall])
  return (
    <ul
      ref={menuRef}
      className="grid grid-cols-1 gap-y-4 overflow-hidden transition-all duration-300
      sm:grid-cols-2 sm:gap-x-4"
      style={{
        maxHeight: menuOpen ? `${scrollHeight}px` : 0,
      }}
    >
      {tagsWithProducts.map(({ name }) => {
        return (
          <li key={name} className="last:mb-5">
            <CategoryLink category={category} tag={name} />
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryMenu
