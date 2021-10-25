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
  const isXxs = useMediaQuery({ query: '(min-width: 350px)' })
  const isXs = useMediaQuery({ query: '(min-width: 475px)' })
  const isSmall = useMediaQuery({ query: '(min-width: 640px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  const [scrollHeight, setScrollHeight] = useState<string>('none')
  const menuRef = useRef<null | HTMLUListElement>(null)

  const handleScrollHeight = () => {
    const height = menuRef?.current?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(`${height}px`)
    }
  }

  useEffect(() => {
    handleScrollHeight()
  }, [menuOpen, isXxs, isXs, isSmall, isDesktop, tagsWithProducts])

  return (
    <ul
      ref={menuRef}
      className="grid grid-cols-1 gap-y-4 overflow-hidden transition-all duration-700
      xxs:grid-cols-2 xxs:gap-x-3 xs:gap-x-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-x-0"
      style={{
        // eslint-disable-next-line no-nested-ternary
        maxHeight: menuOpen ? scrollHeight : 0,
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
