import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import useResizeObserver from '@react-hook/resize-observer'
import debounce from 'lodash.debounce'

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
  const [scrollHeight, setScrollHeight] = useState<string>('none')
  const menuRef = useRef<null | HTMLUListElement>(null)

  const handleScrollHeight = (target: Element) => {
    const height = target?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(`${height}px`)
    }
  }

  const debouncedResize = debounce(handleScrollHeight, 100)
  useResizeObserver(menuRef, ({ target }) => debouncedResize(target))

  useEffect(() => {
    if (menuRef.current) {
      handleScrollHeight(menuRef.current)
    }
  }, [tagsWithProducts])

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
