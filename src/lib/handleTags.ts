import type { TagsWithProducts } from '@components/products-page/products-menu/Category'
import { cleanString } from '@lib/sortProducts'
import { ProductCategories, ProductLowercase } from '@models/ambassador'
import { ICategoryFields } from '@models/contentful-graph'
import { TagsByCategory, TagsByCount } from '@redux/productsSlice'

export const getTopStyles = (tags: TagsByCount) => {
  const { style } = tags

  return Object.entries(style)
    .sort((a, b) => {
      return b[1] - a[1]
    })
    .map((tag) => tag[0])
}

export const getCategories = (
  items: ICategoryFields[],
  allTags: TagsByCount
) => {
  // const { items } = categoryCollection

  const { parentType, category, type } = { ...allTags }
  const merged = { ...parentType, ...category, ...type }

  const categoriesWithCount = items.map((item: ICategoryFields) => {
    const count = merged[item.categoryName.toLowerCase()]
    return { ...item, count: count || 0 }
  })

  return categoriesWithCount.sort((a: ICategoryFields, b: ICategoryFields) => {
    return b.count - a.count
  })
}

export const getAllTags = (products: ProductLowercase[]) => {
  const getTagCategories = (
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
      return getTagCategories(childAcc, cur, childCur)
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

const sortCount = (tags: TagsWithProducts[]) => {
  return [...tags].sort((a, b) => {
    return b.productCount - a.productCount
  })
}

const sortAlphabetically = (tags: TagsWithProducts[]) => {
  return [...tags].sort((a, b) => {
    return cleanString(a.name).localeCompare(b.name)
  })
}

const sortPriceRange = (tags: TagsWithProducts[]) => {
  const ranges = sortAlphabetically(tags)

  return ranges.slice(-1).concat(ranges.slice(0, -1))
}

export const sortCategoryTags = (
  currCategory: keyof TagsByCategory,
  obj: TagsWithProducts[]
) => {
  switch (currCategory) {
    case 'parentType': {
      return sortCount(obj)
    }
    case 'category': {
      return sortAlphabetically(obj)
    }
    case 'style': {
      return sortAlphabetically(obj)
    }
    case 'country': {
      return sortAlphabetically(sortCount(obj).slice(0, 20))
    }
    case 'varietal': {
      return sortAlphabetically(sortCount(obj).slice(0, 20))
    }
    case 'range': {
      return sortPriceRange(obj)
    }
    default: {
      return sortAlphabetically(obj)
    }
  }
}
