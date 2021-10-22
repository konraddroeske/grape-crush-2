import { ProductLowercase } from '@models/ambassador'
import type { SortOption } from '@redux/productsSlice'

export const cleanString = (str: string) =>
  str.replace(/\W/g, '').trim().toLowerCase()

// eslint-disable-next-line import/prefer-default-export
export const sortProducts = (
  unsortedProducts: ProductLowercase[],
  sortOption: SortOption
) => {
  if (sortOption === 'alphabetical, a - z') {
    return unsortedProducts.sort((a, b) => {
      const { data: dataA } = a
      const { data: dataB } = b
      return cleanString(dataA.name).localeCompare(cleanString(dataB.name))
    })
  }

  if (sortOption === 'alphabetical, z - a') {
    return unsortedProducts.sort((a, b) => {
      const { data: dataA } = a
      const { data: dataB } = b
      return cleanString(dataB.name).localeCompare(cleanString(dataA.name))
    })
  }

  if (sortOption === 'price, low to high') {
    return unsortedProducts.sort((a, b) => {
      const { data: dataA } = a
      const { data: dataB } = b
      return dataA.variants[0].amount - dataB.variants[0].amount
    })
  }

  if (sortOption === 'price, high to low') {
    return unsortedProducts.sort((a, b) => {
      const { data: dataA } = a
      const { data: dataB } = b
      return dataB.variants[0].amount - dataA.variants[0].amount
    })
  }

  if (sortOption === 'date, new to old') {
    const newTags = unsortedProducts.filter((product) =>
      product.data.type.includes('new!')
    )

    const withoutNewTags = unsortedProducts.filter(
      (product) => !product.data.type.includes('new!')
    )

    const sortedNewTags = sortNewToOld(newTags)
    const sortedWithoutNewTags = sortNewToOld(withoutNewTags)

    return sortedNewTags.concat(sortedWithoutNewTags)
  }

  if (sortOption === 'date, old to new') {
    return unsortedProducts.sort((a, b) => {
      const dateA = parseInt(a._id.slice(0, 8), 16)
      const dateB = parseInt(b._id.slice(0, 8), 16)
      return dateA - dateB
    })
  }

  return unsortedProducts
}

const sortNewToOld = (products: ProductLowercase[]) => {
  return products.sort((a, b) => {
    const dateA = parseInt(a._id.slice(0, 8), 16)
    const dateB = parseInt(b._id.slice(0, 8), 16)
    return dateB - dateA
  })
}

// const sortOldToNew = (products: ProductLowercase[]) => {
//   return products.sort((a, b) => {
//     const dateA = parseInt(a._id.slice(0, 8), 16)
//     const dateB = parseInt(b._id.slice(0, 8), 16)
//     return dateA - dateB
//   })
// }
