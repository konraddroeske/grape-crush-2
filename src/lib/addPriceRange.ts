import { Product } from '@models/ambassador'

// eslint-disable-next-line import/prefer-default-export
export const addPriceRange = (products: Product[]) => {
  return products.map((product) => {
    const price = product?.data?.variants?.[0]?.amount

    switch (true) {
      case !price: {
        const data = { ...product.data, range: [] }
        return { ...product, data }
      }
      case price < 2500: {
        const data = { ...product.data, range: ['under $25'] }
        return { ...product, data }
      }
      case price < 3500: {
        const data = { ...product.data, range: ['$25 — $35'] }
        return { ...product, data }
      }
      case price < 4500: {
        const data = { ...product.data, range: ['$35 — $45'] }
        return { ...product, data }
      }
      // case price < 10000: {
      //   const data = { ...product.data, range: ['$50 — $100'] }
      //   return { ...product, data }
      // }
      default: {
        const data = { ...product.data, range: ['over $45'] }
        return { ...product, data }
      }
    }
  })
}
