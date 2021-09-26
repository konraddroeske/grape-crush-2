import { NextRouter } from 'next/router'

// eslint-disable-next-line import/prefer-default-export
export const simpleRoute = (
  router: NextRouter,
  newCategory: string,
  newTag: string
) => {
  const href = `/products/?${encodeURIComponent(
    newCategory
  )}=${encodeURIComponent(newTag)}`
  router.push(href, href, { shallow: true }).then(() => window.scrollTo(0, 0))
}
