import { TagsByCategory } from '@redux/productsSlice'

// eslint-disable-next-line import/prefer-default-export
export const convertTagsToHref = (tags: TagsByCategory, page = 1) => {
  return Object.entries(tags).reduce((acc, cur) => {
    if (cur[1].length > 0) {
      const encoded = cur[1]
        .map((ele: string) => encodeURIComponent(ele))
        .join()
      return `${acc}&${cur[0]}=${encoded}`
    }

    return acc
  }, `/products?page=${page}`)
}
