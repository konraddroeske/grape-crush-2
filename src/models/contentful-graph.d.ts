import { Document } from '@contentful/rich-text-types'

export interface Asset {
  url: string
  width: number
  height: number
  description: string
  title: string
}

export interface IPageFields {
  title: string
  slug: string
  category: 'Help' | 'Legal Stuff'
  content?: {
    json: Document | undefined
  }
}

export interface IFooterFields {
  image: Asset
}

export interface INavFields {
  image: Asset
}

export interface ICategoryFields {
  title: string
  image: Asset
  categoryName: string
  link: string
}

export interface IContactFields {
  slug: string
  address: {
    json: Document
  }
  hours: {
    json: Document
  }
  contact: {
    json: Document
  }
  image: Asset
}

export interface IFaqFields {
  anchor: string
  question: string
  answer: string
  published: string
}

export interface IAboutFields {
  slug: string
  headline: string
  paragraph1: {
    json: Document
  }
  image1: Asset
  paragraph2: {
    json: Document
  }
  image2: Asset
}

export interface ITeamMembersFields {
  name: string
  image: Asset
  description: string
}

export interface IInfoBox1Fields {
  title: string
  order: number
  description: string
  image: Asset
  tag?: string | undefined
}

export interface IHeroSlideFields {
  title: string
  image: Asset
  link?: string | undefined
  mainImage: boolean
}

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
