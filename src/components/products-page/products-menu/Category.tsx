import React, { FunctionComponent, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import CategoryLink from '@components/products-page/products-menu/CategoryLink'
import { ProductLowercase } from '@models/ambassador'
import { selectProducts, TagsByCategory } from '@redux/productsSlice'

interface OwnProps {
  title: string
  category: keyof TagsByCategory
  tags: string[]
}

type Props = OwnProps

const Category: FunctionComponent<Props> = ({ title, category, tags }) => {
  const { products, totalSelected } = useSelector(selectProducts())
  const [tagsWithQuantity, setTagsWithQuantity] =
    useState<{ name: string; count: number }[]>()

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

        const count =
          handleIntersect(categoryProducts, totalSelected).length || 0
        return { name: tag, count }
      })
      .filter((tag) => tag.count > 0)

    setTagsWithQuantity(filteredTags)
  }, [tags, category, products, totalSelected])

  return (
    <>
      {tagsWithQuantity && tagsWithQuantity?.length > 0 && (
        <div className="border-b border-blue pb-4 mb-4">
          <h3 className="text-2xl text-blue font-bold uppercase mb-3">
            {title}
          </h3>
          <ul>
            {tagsWithQuantity.map(({ name }) => {
              return (
                <li key={name} className="mb-4">
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
