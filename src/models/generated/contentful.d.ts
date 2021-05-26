// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Document } from "@contentful/rich-text-types"
import { Asset, Entry } from "contentful"

export interface IFaqFields {
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
        id: "faq"
        linkType: "ContentType"
        type: "Link"
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
        id: "heroSlide"
        linkType: "ContentType"
        type: "Link"
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
        id: "moreInfo"
        linkType: "ContentType"
        type: "Link"
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
        id: "products"
        linkType: "ContentType"
        type: "Link"
      }
    }
  }
}

export type CONTENT_TYPE = "faq" | "heroSlide" | "moreInfo" | "products"

export type LOCALE_CODE = "en-US"

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US"
