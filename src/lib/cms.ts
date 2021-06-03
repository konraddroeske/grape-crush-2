import {
  Asset,
  Collection,
  EntryProps,
  Entry,
} from "contentful-management/types"

import contentfulClient from "../../getContentfulEnvironment"

const client = await contentfulClient()

export const getHeroEntries = async (): Promise<
  Collection<Entry, EntryProps<Record<string, any>>>
> => {
  return client.getEntries({
    content_type: "heroSlide",
  })
}

export const getImage = async (assetId: string): Promise<Asset> => {
  return client.getAsset(assetId)
}
