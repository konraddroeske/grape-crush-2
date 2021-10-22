import { ProductCategories, ProductLowercase } from '@models/ambassador'
import { TagsByCategory, TagsByCount } from '@redux/productsSlice'

export const getTopStyles = (tags: TagsByCount) => {
  const { style } = tags

  return Object.entries(style)
    .sort((a, b) => {
      return b[1] - a[1]
    })
    .map((tag) => tag[0])
}

export const getAllTags = (products: ProductLowercase[]) => {
  const getCategories = (
    acc: TagsByCategory,
    cur: ProductLowercase,
    category: ProductCategories
  ) => {
    const tagCategory = category.toLowerCase() as keyof TagsByCategory

    if (cur.data?.[category]) {
      if (cur.data[category] instanceof Array) {
        const mergedCategories = acc[tagCategory]
          ? acc[tagCategory].concat(cur.data[category])
          : cur.data[category]

        return { ...acc, [category.toLowerCase()]: mergedCategories }
      }

      const mergedCategories =
        acc?.[tagCategory] instanceof Array
          ? [...acc[tagCategory], cur.data[category]]
          : [cur.data[category]]

      return { ...acc, [category.toLowerCase()]: mergedCategories }
    }

    return acc
  }

  const categories: ProductCategories[] = [
    'category',
    'type',
    'style',
    'varietal',
    'country',
    'range',
  ]

  const tagsByCategory = products.reduce((acc, cur) => {
    const newAcc = categories.reduce((childAcc, childCur) => {
      return getCategories(childAcc, cur, childCur)
    }, acc as TagsByCategory)

    if (cur.type) {
      const mergedType =
        acc.parentType?.length > 0
          ? acc.parentType.concat([cur.type])
          : [cur.type]

      return { ...newAcc, parentType: mergedType }
    }

    if (Object.keys(newAcc).length !== 0) {
      return newAcc
    }

    return acc
  }, {} as TagsByCategory)

  return Object.entries(tagsByCategory).reduce((parentAcc, category) => {
    const [name, tags]: [string, string[]] = category

    const count = tags.reduce((childAcc: Record<string, number>, tag) => {
      return { ...childAcc, [tag]: (childAcc[tag] || 0) + 1 }
    }, {})

    return { ...parentAcc, [name]: count }
  }, {} as TagsByCount)
}
