import { Product } from '@models/ambassador'

// eslint-disable-next-line import/prefer-default-export
export const renameKeys = (products: Product[]) => {
  return products.map((product) => {
    const { data } = product

    const {
      Country: country,
      Style: style,
      Type: type,
      Varietal: varietal,
      ...rest
    } = data

    return {
      ...product,
      data: {
        ...rest,
        country: country || [],
        style: style || [],
        type: type || [],
        varietal: varietal || [],
      },
    }
  })
}
