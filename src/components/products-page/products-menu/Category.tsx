import React, { FunctionComponent, useState, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'

import CategoryMenu from '@components/products-page/products-menu/CategoryMenu'
import { ProductLowercase } from '@models/ambassador'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

import TriangleArrow from '../../../assets/svgs/triangle-arrow.svg'

interface OwnProps {
  title: string
  category: keyof TagsByCategory
  tagsObj: Record<string, number>
}

type Props = OwnProps

export interface TagsWithProducts {
  name: string
  productCount: number
}

const Category: FunctionComponent<Props> = ({ title, category, tagsObj }) => {
  const { products, totalSelected } = useSelector(selectProducts())
  const [tagsWithProducts, setTagsWithProducts] = useState<TagsWithProducts[]>(
    []
  )

  const [menuOpen, setMenuOpen] = useState<boolean>(true)
  const arrowRef = useRef<HTMLDivElement>(null)

  const handleIntersect = (a: ProductLowercase[], b: ProductLowercase[]) => {
    return a.filter(Set.prototype.has, new Set(b))
  }

  useEffect(() => {
    const filteredTags = Object.keys(tagsObj)
      .map((tag) => {
        const categoryProducts = products.filter((product) => {
          if (category === 'parentType') {
            return product.type === tag
          }

          const { data } = product

          return (
            data[category] &&
            (data[category] === tag || data[category].includes(tag))
          )
        })

        const productCount =
          handleIntersect(categoryProducts, totalSelected).length || 0
        return { name: tag, productCount }
      })
      .filter((tag) => tag.productCount > 0)

    setTagsWithProducts(filteredTags)
  }, [tagsObj, category, products, totalSelected])

  return (
    <>
      <div className="border-b-2 border-lime mb-4">
        <button
          type="button"
          className="flex items-center mb-4 pr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <h3 className="text-2xl text-blue-dark font-bold uppercase mr-3">
            {title}
          </h3>
          {tagsWithProducts.length > 0 && (
            <div
              ref={arrowRef}
              className="transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <TriangleArrow className="w-3 transform" />
            </div>
          )}
        </button>
        <CategoryMenu
          category={category}
          menuOpen={menuOpen}
          tagsWithProducts={tagsWithProducts}
        />
      </div>
    </>
  )
}

export default Category
