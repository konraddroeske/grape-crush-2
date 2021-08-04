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

export type ProductCategories =
  | 'category'
  | 'country'
  | 'style'
  | 'varietal'
  | 'type'
  | 'range'

export interface ProductData {
  Country: string[]
  Style: string[]
  Type: string[]
  Varietal: string[]
  range: string[]
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

export interface ProductDataLowercase {
  country: string[]
  style: string[]
  type: string[]
  varietal: string[]
  range: string[]
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

export interface ProductLowercase {
  data: ProductDataLowercase
  link: string
  productTypeId: string
  type: string
  _id: string
}

export interface Category {
  id: string
  label: string
  tags: string[]
}

export interface Shop {
  baseTags: string[]
  categories: Category[]
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

export interface IgImage {
  id: string
  caption: string
  // eslint-disable-next-line camelcase
  media_type: string
  // eslint-disable-next-line camelcase
  media_url: string
  owner: { id: string }
  permalink: string
  timestamp: string
}

export interface IgMedia {
  pageId: string
  media: IgImage[]
}

export interface AmbassadorIg {
  data: IgMedia[]
}

export interface AmbassadorShops {
  data: Shops
}
