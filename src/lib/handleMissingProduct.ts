import ambassador from '@lib/ambassador'
import { cleanData } from '@lib/cleanData'
import { AmbassadorShops } from '@models/ambassador'

export default async function handleMissingProduct(name: string) {
  const data = await ambassador.api.allShopsWithoutCache<AmbassadorShops>()
  const { data: allShops } = data

  const { shops } = allShops
  const [shop] = shops
  const { products } = shop

  const productsWithNewKeys = cleanData(products)

  const currentProduct = productsWithNewKeys.find(
    (product) => product.data.name === decodeURIComponent(name)
  )

  return {
    products: productsWithNewKeys,
    product: currentProduct,
  }
}
