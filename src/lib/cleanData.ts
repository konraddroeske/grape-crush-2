import { Product } from '@models/ambassador'

// eslint-disable-next-line import/prefer-default-export
export const cleanData = (products: Product[]) => {
  const newKeys = products.map((product) => {
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

  return newKeys.filter((product) => {
    return !(
      product.data.variants.length === 1 &&
      product.data.variants[0].tags?.includes('delivery')
    )
  })
}
