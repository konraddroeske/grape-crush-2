import { Product } from '@models/ambassador'

// eslint-disable-next-line import/prefer-default-export
export const cleanData = (products: Product[]) => {
  return products.map((product) => {
    const { type: parentType, data } = product

    const {
      Country: country,
      Style: style,
      Type: type,
      Varietal: varietal,
      category,
      ...rest
    } = data

    return {
      ...product,
      type: parentType?.toLowerCase() || '',
      data: {
        ...rest,
        country: country || [],
        style: style || [],
        type: type || [],
        varietal: varietal || [],
        category: category?.toLowerCase() || '',
      },
    }
  })
}
