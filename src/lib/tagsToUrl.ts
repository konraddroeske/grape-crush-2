import { TagsByCategory } from '@redux/productsSlice'

// eslint-disable-next-line import/prefer-default-export
export const tagsToUrl = (tags: TagsByCategory) => {
  return Object.entries(tags).reduce((acc, cur) => {
    if (cur[1].length > 0) {
      const encoded = cur[1]
        .map((ele: string) => encodeURIComponent(ele))
        .join()
      const join = acc === '/products/' ? '?' : '&'
      return `${acc}${join}${cur[0]}=${encoded}`
    }

    return acc
  }, '/products/')
}
