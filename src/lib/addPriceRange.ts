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
      case price < 2000: {
        const data = { ...product.data, range: ['under $20'] }
        return { ...product, data }
      }
      case price < 3000: {
        const data = { ...product.data, range: ['$20 — $30'] }
        return { ...product, data }
      }
      case price < 5000: {
        const data = { ...product.data, range: ['$30 — $50'] }
        return { ...product, data }
      }
      case price < 10000: {
        const data = { ...product.data, range: ['$50 — $100'] }
        return { ...product, data }
      }
      default: {
        const data = { ...product.data, range: ['over $100'] }
        return { ...product, data }
      }
    }
  })
}
