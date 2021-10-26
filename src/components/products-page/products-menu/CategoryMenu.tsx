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
      <ul ref={listRef} className="flex flex-wrap pb-2">
        {tagsWithProducts.map(({ name, productCount }) => {
          return (
            <li key={name} className="mr-2 mb-2">
              <CategoryLink
                category={category}
                tag={name}
                productCount={productCount}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryMenu
