export interface Addons {
  addons: string[]
}

export interface Variants {
  addons: Addons
  amount: number
  id: string
  label: string
  value: string
  tags: string[]
}

export interface ProductData {
  Country: string[]
  Style: string[]
  Type: string[]
  Varietal: string[]
  // eslint-disable-next-line camelcase
  Varietal_Text: string
  addons: Addons
  bottleSize: string
  category: string
  description: string
  imageUrl: string[]
  name: string
  region: string
  subtype: string
  tags: string[]
  taxable: boolean
  variants: Variants[]
  vintage: string
  winery: string
}

export interface Product {
  data: ProductData
  link: string
  productTypeId: string
  type: string
  _id: string
}

export interface Shop {
  baseTags: string[]
  categories: { id: string; label: string; tags: string[] }[]
  filterTags: string[]
  headerImg: string | null
  id: string
  message: string
  name: string
  pageId: string
  products: Product[]
}

export interface Shops {
  shops: Shop[]
}

export interface AmbassadorResponse {
  data: Shops
}
