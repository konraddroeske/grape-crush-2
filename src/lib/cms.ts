import { Asset, Entry } from 'contentful-management/types'

import contentfulClient from '../../getContentfulEnvironment'

const client = await contentfulClient()

export const getEntries = async (contentType: string): Promise<Entry[]> => {
  const { items } = await client.getEntries({
    content_type: contentType,
    locale: 'en-US',
  })

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
