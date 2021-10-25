import React, { FunctionComponent, useRef, useState } from 'react'

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
  const menuRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  const handleScrollHeight = (target: Element) => {
    const height = target?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(`${height}px`)
    }
  }

  const debouncedResize = debounce(handleScrollHeight, 100)
  useResizeObserver(listRef, ({ target }) => debouncedResize(target))

  return (
    <div
      ref={menuRef}
      className="overflow-hidden transition-all duration-700"
      style={{
        maxHeight: menuOpen ? scrollHeight : 0,
      }}
    >
      <ul
        ref={listRef}
        className="grid grid-cols-1 gap-y-4 xxs:grid-cols-2 xxs:gap-x-3 xs:gap-x-4
        sm:grid-cols-3 lg:grid-cols-1 lg:gap-x-0"
      >
        {tagsWithProducts.map(({ name }) => {
          return (
            <li key={name} className="last:mb-5">
              <CategoryLink category={category} tag={name} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryMenu
