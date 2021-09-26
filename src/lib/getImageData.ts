import { Asset } from '@models/contentful-graph'
import { ImageData } from '@models/misc'

// eslint-disable-next-line import/prefer-default-export
export const getImageData = (
  // image: CmsImage,
  image: Asset
  // locale: CONTENTFUL_DEFAULT_LOCALE_CODE
): ImageData => {
  const { url, description: alt, width, height } = image

  return { url, alt, height, width }
}
