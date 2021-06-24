import { Asset, Entry } from 'contentful-management/types'

import contentfulClient from '../../getContentfulEnvironment'

const client = await contentfulClient()

export const getEntries = async (contentType: string): Promise<Entry[]> => {
  const { items } = await client.getEntries({
    content_type: contentType,
  })

  return items
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
  image: {
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