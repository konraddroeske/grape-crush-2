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
  image?: CmsImage
}

export const getEntries = async (contentType: string): Promise<Entry[]> => {
  const { items } = await client.getEntries({
    content_type: contentType,
  })

  return items
}

export const getAllEntries = async (): Promise<Entry[]> => {
  const { items } = await client.getEntries()

  return items
}

export const getAllAssets = async () => {
  const { items } = await client.getAssets()

  return items
}

export const getAssets = async (entries: Entry[], locale = 'en-US') => {
  return Promise.all(
    entries.map(async (entry) => {
      const { fields } = entry

      if (fields.image) {
        const { id } = fields.image[locale].sys
        const { fields: imageFields } = await getImage(id)

        return {
          ...fields,
          image: imageFields,
        }
      }

      return {
        ...fields,
      }
    })
  )
}

export const getImage = async (assetId: string): Promise<Asset> =>
  client.getAsset(assetId)
