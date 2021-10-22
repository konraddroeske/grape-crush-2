import type { TagsByCategory } from '@redux/productsSlice'

// eslint-disable-next-line import/prefer-default-export
export const sortTags = (
  selectedTags: TagsByCategory,
  tags: Record<string, string>
) =>
  Object.entries(selectedTags).reduce((acc, cur) => {
    const isCategory = Object.keys(tags).includes(cur[0])

    if (isCategory) {
      const splitTags = tags[cur[0]].split(',')

      return { ...acc, [cur[0]]: splitTags }
    }

    return { ...acc, [cur[0]]: [] }
  }, {} as TagsByCategory)
