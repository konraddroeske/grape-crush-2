import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import Selected from '@assets/svgs/box-selected.svg'
import Box from '@assets/svgs/box.svg'
import { ProductLowercase } from '@models/ambassador'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

interface OwnProps {
  category: keyof TagsByCategory
  tag: string
}

type Props = OwnProps

const CategoryLink: FunctionComponent<Props> = ({ category, tag }) => {
  const router = useRouter()
  const { selectedTags, products, totalSelected } = useSelector(
    selectProducts()
  )
  const [selected, setSelected] = useState(false)
  const [categoryProducts, setCategoryProducts] =
    useState<ProductLowercase[] | null>(null)

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        if (category === 'parentType') {
          return product.type === tag
        }

        const { data } = product

        return (
          data[category] &&
          (data[category] === tag || data[category].includes(tag))
        )
      })

      setCategoryProducts(filtered)
    }
  }, [products, category, tag])

  const getUpdatedTags = (
    categoryName: keyof TagsByCategory,
    tagName: string
  ) => {
    if (selectedTags[categoryName].includes(tagName)) {
      const categoryTags = selectedTags[category].filter(
        (categoryTag) => categoryTag !== tagName
      )

      return {
        ...selectedTags,
        [categoryName]: categoryTags,
      }
    }

    return {
      ...selectedTags,
      [categoryName]: [...selectedTags[category], tagName],
    }
  }

  const handleClick = (categoryName: keyof TagsByCategory, tagName: string) => {
    const updatedTags = getUpdatedTags(categoryName, tagName)

    const href = Object.entries(updatedTags).reduce((acc, cur) => {
      if (cur[1].length > 0) {
        const encoded = cur[1].map((ele) => encodeURIComponent(ele)).join()
        const join = acc === '/products/' ? '?' : '&'
        return `${acc}${join}${cur[0]}=${encoded}`
      }

      return acc
    }, '/products/')

    router.push(href, href, { shallow: true })
  }

  useEffect(() => {
    setSelected(selectedTags[category].includes(tag))
  }, [selectedTags, category, tag])

  const handleIntersect = (a: ProductLowercase[], b: ProductLowercase[]) => {
    return a.filter(Set.prototype.has, new Set(b))
  }

  return (
    <button
      type="button"
      className="font-sans flex text-sm capitalize items-center justify-start"
      onClick={() => handleClick(category, tag)}
    >
      {selected ? (
        <div className="mr-2">
          <Selected className="w-4" />
        </div>
      ) : (
        <div className="mr-2">
          <Box className="w-4" />
        </div>
      )}
      <span className="leading-5 text-left">{tag}</span>
      <div className="ml-2 mr-auto text-2xs text-left font-bold leading-none">
        (
        {categoryProducts &&
          handleIntersect(categoryProducts, totalSelected).length}
        )
      </div>
    </button>
  )
}

export default CategoryLink
