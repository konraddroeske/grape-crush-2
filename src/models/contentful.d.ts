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
  headline: {
    [K in LOCALE_CODE]: string
  }
  paragraph1: {
    [K in LOCALE_CODE]: Document
  }
  image1: CmsImage
  paragraph2: {
    [K in LOCALE_CODE]: Document
  }
  image2: CmsImage
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
  title: {
    [K in LOCALE_CODE]: string
  }

  /** Image */
  image: CmsImage

  /** Category Name */
  categoryName: {
    [K in LOCALE_CODE]: string
  }
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
  anchor: {
    [K in LOCALE_CODE]: string
  }

  /** Question */
  question: {
    [K in LOCALE_CODE]: string
  }

  /** Answer */
  answer: {
    [K in LOCALE_CODE]: string
  }

  /** Published */
  published: {
    [K in LOCALE_CODE]: string
  }
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
  image: CmsImage
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
  title: {
    [K in LOCALE_CODE]: string
  }

  /** Image */
  image: CmsImage

  /** Link */
  link?: { [K in LOCALE_CODE]: string | undefined }
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
  title: {
    [K in LOCALE_CODE]: string
  }

  /** Order */
  order: {
    [K in LOCALE_CODE]: number
  }

  /** Description */
  description: {
    [K in LOCALE_CODE]: string
  }

  /** Image */
  image: CmsImage

  /** Tag */
  tag?: { [K in LOCALE_CODE]: string | undefined }
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
  image: CmsImage
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
  title: {
    [K in LOCALE_CODE]: string
  }

  /** Slug */
  slug: {
    [K in LOCALE_CODE]: string
  }

  /** Category */
  category: { [K in LOCALE_CODE]: 'Help' | 'Legal Stuff' }

  /** Content */
  content?: { [K in LOCALE_CODE]: Document | undefined }
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
