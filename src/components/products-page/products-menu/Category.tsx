import React, { FunctionComponent, useState, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import CategoryLink from '@components/products-page/products-menu/CategoryLink'
import { ProductLowercase } from '@models/ambassador'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

import TriangleArrow from '../../../assets/svgs/triangle-arrow.svg'

interface OwnProps {
  title: string
  category: keyof TagsByCategory
  tags: string[]
}

type Props = OwnProps

const Category: FunctionComponent<Props> = ({ title, category, tags }) => {
  const { products, totalSelected } = useSelector(selectProducts())
  const [tagsWithProducts, setTagsWithProducts] = useState<
    { name: string; productCount: number }[]
  >([])

  const [menuOpen, setMenuOpen] = useState<boolean>(true)
  const menuRef = useRef<HTMLUListElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const handleIntersect = (a: ProductLowercase[], b: ProductLowercase[]) => {
    return a.filter(Set.prototype.has, new Set(b))
  }

  useEffect(() => {
    const filteredTags = tags
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
  }, [tags, category, products, totalSelected])

  useEffect(() => {
    const duration = 0.4
    if (!menuOpen) {
      gsap.to(menuRef.current, {
        duration,
        maxHeight: '0px',
      })
      gsap.to(arrowRef.current, {
        duration,
        rotate: '0deg',
      })
    }

    if (menuOpen && menuRef.current) {
      const height = menuRef?.current.scrollHeight
      gsap.to(menuRef.current, {
        duration,
        maxHeight: `${height}px`,
      })
      gsap.to(arrowRef.current, {
        duration,
        rotate: '180deg',
      })
    }
  }, [menuOpen, tagsWithProducts])

  return (
    <>
      {tagsWithProducts?.length > 0 && (
        <div className="border-b-2 border-lime mb-4">
          <button
            type="button"
            className="flex items-center mb-4 pr-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <h3 className="text-2xl text-blue-dark font-bold uppercase mr-4">
              {title}
            </h3>
            <div ref={arrowRef}>
              <TriangleArrow className="w-3 transform" />
            </div>
          </button>
          <ul ref={menuRef} className="overflow-hidden">
            {tagsWithProducts.map(({ name }) => {
              return (
                <li key={name} className="mb-4 last:mb-5">
                  <CategoryLink category={category} tag={name} />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export default Category
