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
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  const [scrollHeight, setScrollHeight] = useState<number | null>(null)
  const menuRef = useRef<null | HTMLUListElement>(null)

  const handleScrollHeight = () => {
    const height = menuRef?.current?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(height)
    }
  }

  useEffect(() => {
    handleScrollHeight()
  }, [menuOpen, isSmall, isDesktop, tagsWithProducts])

  return (
    <ul
      ref={menuRef}
      className="grid grid-cols-1 gap-y-4 overflow-hidden transition-all duration-300
      sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-1 lg:gap-x-0"
      style={{
        // eslint-disable-next-line no-nested-ternary
        maxHeight: menuOpen ? (scrollHeight ? `${scrollHeight}px` : 'none') : 0,
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
