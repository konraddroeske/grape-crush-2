import { CmsImage, CONTENTFUL_DEFAULT_LOCALE_CODE } from '@models/contentful'
import { ImageData } from '@models/misc'

// eslint-disable-next-line import/prefer-default-export
export const getImageData = (
  image: CmsImage,
  locale: CONTENTFUL_DEFAULT_LOCALE_CODE
): ImageData => {
  const { url } = image.file[locale]
  const alt = image?.description?.[locale]
  const { height, width } = image.file[locale]?.details?.image

  return { url, alt, height, width }
}
