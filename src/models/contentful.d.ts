import { Document } from '@contentful/rich-text-types'
import { Asset, Entry } from 'contentful'

export interface CmsImage {
  title: {
    [K in LOCALE_CODE]: string
  }
  description?: {
    [K in LOCALE_CODE]: string
  }
  file: {
    [K in LOCALE_CODE]: {
      fileName: string
      contentType: string
      upload?: string
      url?: string
      details?: Record<string, any>
      uploadFrom?: Record<string, any>
    }
  }
}

export interface IAboutFields {
  /** Headline */
  headline: {
    [K in LOCALE_CODE]: string
  }

  /** Paragraph 1 */
  paragraph1: {
    [K in LOCALE_CODE]: Document
  }

  /** Image 1 */
  // image1: {
  //   [K in LOCALE_CODE]: Asset
  // }
  image1: CmsImage

  /** Paragraph 2 */
  paragraph2: {
    [K in LOCALE_CODE]: Document
  }

  /** Image 2 */
  image2: CmsImage

  /** Team Members */
  teamMembers: Entry<{ [fieldId: string]: unknown }>[]
}

/** Content for about-page page. */

export interface IAbout extends Entry<IAboutFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'about'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ICategoryFields {
  /** Title */
  title: string

  /** Image */
  image: Asset

  /** Category Name */
  categoryName: string
}

/** Category media for website. */

export interface ICategory extends Entry<ICategoryFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'category'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IContactFields {
  /** Slug */
  slug: {
    [K in LOCALE_CODE]: string
  }

  /** Address */
  address: {
    [K in LOCALE_CODE]: Document
  }

  /** Hours */
  hours: {
    [K in LOCALE_CODE]: Document
  }

  /** Contact */
  contact: {
    [K in LOCALE_CODE]: Document
  }

  /** Image */
  image: CmsImage
}

export interface IFaqFields {
  /** anchor */
  anchor: string

  /** Question */
  question: string

  /** Answer */
  answer: string

  /** Published */
  published: string
}

export interface IFaq extends Entry<IFaqFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'faq'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IFooterFields {
  /** Image */
  image: Asset
}

export interface IFooter extends Entry<IFooterFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'footer'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IHeroSlideFields {
  /** Title */
  title: string

  /** Image */
  image: Asset

  /** Link */
  link?: string | undefined
}

/** Grape Crush 2.0 Hero Slideshow */

export interface IHeroSlide extends Entry<IHeroSlideFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'heroSlide'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IInfoBox1Fields {
  /** Title */
  title: string

  /** Order */
  order: number

  /** Description */
  description: string

  /** Image */
  image: Asset

  /** Tag */
  tag?: string | undefined
}

/** Info boxes on the landing page. Remember to set the order. */

export interface IInfoBox1 extends Entry<IInfoBox1Fields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'infoBox1'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IMoreInfoFields {
  /** Title */
  title: string

  /** Description */
  description: Document
}

export interface IMoreInfo extends Entry<IMoreInfoFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'moreInfo'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface INavFields {
  /** Image */
  image: Asset
}

export interface INav extends Entry<INavFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'nav'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPageFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Category */
  category: 'Help' | 'Legal Stuff'

  /** Content */
  content?: Document | undefined
}

/** Generated pages */

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'page'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IProductsFields {
  /** Name */
  name: string

  /** Image */
  image: Asset

  /** Link */
  link?: string | undefined

  /** Date */
  date: string

  /** Item Id */
  itemId?: string | undefined
}

/** Featured Products */

export interface IProducts extends Entry<IProductsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'products'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITeamMembersFields {
  /** name */
  name: { [K in LOCALE_CODE]: string }

  /** Image */
  image: CmsImage

  /** Description */
  description: { [K in LOCALE_CODE]: string }
}

/** Featured team members. */

export interface ITeamMembers extends Entry<ITeamMembersFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'teamMembers'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE =
  | 'about'
  | 'category'
  | 'faq'
  | 'footer'
  | 'heroSlide'
  | 'infoBox1'
  | 'moreInfo'
  | 'nav'
  | 'page'
  | 'products'
  | 'teamMembers'

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'