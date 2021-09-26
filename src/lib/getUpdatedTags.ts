import { TagsByCategory } from '@redux/productsSlice'

// eslint-disable-next-line import/prefer-default-export
export const getUpdatedTags = (
  selectedTags: TagsByCategory,
  category: keyof TagsByCategory,
  tagName: string
) => {
  if (selectedTags[category].includes(tagName)) {
    const categoryTags = selectedTags[category].filter(
      (categoryTag) => categoryTag !== tagName
    )

    return {
      ...selectedTags,
      [category]: categoryTags,
    }
  }

  return {
    ...selectedTags,
    [category]: [...selectedTags[category], tagName],
  }
}
