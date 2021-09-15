import { Document } from '@contentful/rich-text-types'
import { Asset, Entry } from 'contentful-management/types'

import contentfulClient from '../../getContentfulEnvironment'

const client = await contentfulClient()

export interface CmsImage {
  title: {
    [key: string]: string
  }
  description?: {
    [key: string]: string
  }
  file: {
    [key: string]: {
      fileName: string
      contentType: string
      upload?: string
      url?: string
      details?: Record<string, any>
      uploadFrom?: Record<string, any>
    }
  }
}

export interface FaqAssets {
  anchor: {
    [key: string]: string
  }
  answer: {
    [key: string]: string
  }
  published: {
    [key: string]: string
  }
  question: {
    [key: string]: string
  }
}

export interface AboutAssets {
  headline: {
    [key: string]: string
  }
  paragraph1: {
    [key: string]: Document
  }
  paragraph2: {
    [key: string]: Document
  }
  image1: CmsImage
  image2: CmsImage
}

export interface CmsAssets {
  title: {
    [key: string]: string
  }
  order: {
    [key: string]: number
  }
  description: {
    [key: string]: string
  }
  tag: {
    [key: string]: string
  }
  categoryName: {
    [key: string]: string
  }
  category: {
    [key: string]: string
  }
  content: {
    [key: string]: any
  }
  slug: {
    [key: string]: string
  }
  name: {
    [key: string]: string
  }
  image?: CmsImage
}

export const getEntries = async (contentType: string): Promise<Entry[]> => {
  const { items } = await client.getEntries({
    content_type: contentType,
    locale: 'en-US',
  })

  // console.log(items)

  return items
}

export const getAssets = async (entries: Entry[], locale = 'en-US') => {
  return Promise.all(
    entries.map(async (entry) => {
      const { fields } = entry

      const imageFields = Object.entries(fields).filter(([field, _]) => {
        return field.toLowerCase().includes('image')
      })

      if (imageFields.length > 0) {
        const updatedImageFields = await Promise.all(
          imageFields.map(async ([name, data]) => {
            const { id } = data[locale].sys
            const { fields: imageField } = await getImage(id)

            return { [name]: imageField }
          })
        )

        const flattenedImages = updatedImageFields.reduce(
          (acc, cur) => Object.assign(acc, cur),
          {}
        )

        return {
          ...fields,
          ...flattenedImages,
        }
      }

      return fields
    })
  )
}

export const getImage = async (assetId: string): Promise<Asset> =>
  client.getAsset(assetId)
