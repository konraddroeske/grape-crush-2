import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import useResizeObserver from '@react-hook/resize-observer'
import debounce from 'lodash.debounce'

import deburr from 'lodash.deburr'

import type { TagsWithProducts } from '@components/products-page/products-menu/Category'
import CategoryLink from '@components/products-page/products-menu/CategoryLink'

import CategorySearch from '@components/products-page/products-menu/CategorySearch'
import { sortCategoryTags } from '@lib/handleTags'
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
  const [search, setSearch] = useState<string>('')
  const [tagsAfterSearch, setTagsAfterSearch] = useState<
    TagsWithProducts[] | null
  >(null)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm)
  }

  useEffect(() => {
    const filtered =
      search.length > 0
        ? tagsWithProducts.filter(({ name }) =>
            deburr(name).toLowerCase().includes(deburr(search).toLowerCase())
          )
        : tagsWithProducts

    const sorted = sortCategoryTags(category, filtered)
    setTagsAfterSearch(sorted)
  }, [search, category, tagsWithProducts])

  const handleScrollHeight = (target: Element) => {
    const height = target?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(`${height}px`)
    }
  }

  const debouncedResize = debounce(handleScrollHeight, 25)
  useResizeObserver(containerRef, ({ target }) => debouncedResize(target))

  return (
    <div
      ref={menuRef}
      className="overflow-hidden transition-all duration-700"
      style={{
        maxHeight: menuOpen ? scrollHeight : 0,
      }}
    >
      <div ref={containerRef} className="">
        {tagsWithProducts.length > 20 && (
          <div className="mb-4 max-w-lg">
            <CategorySearch handleSearch={handleSearch} />
          </div>
        )}
        <ul className="flex flex-wrap">
          {tagsAfterSearch &&
            tagsAfterSearch.map(({ name, productCount }) => {
              return (
                <li key={name} className="mr-2 mb-2 last:mb-6">
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
    </div>
  )
}

export default CategoryMenu
