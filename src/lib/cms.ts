import { Asset, Collection } from "contentful-management/types"

import contentfulClient from "../../getContentfulEnvironment"

const client = await contentfulClient()

export const getHeroEntries = async (): Promise<Collection<any, any>> => {
  const heroSlides = client.getEntries({
    content_type: "heroSlide",
  })

  return heroSlides
}

export const getImage = async (assetId: string): Promise<Asset> => {
  return client.getAsset(assetId)
}
