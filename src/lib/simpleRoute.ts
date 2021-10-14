import { NextRouter } from 'next/router'

// eslint-disable-next-line import/prefer-default-export
export const simpleRoute = (
  router: NextRouter,
  newCategory: string,
  newTag: string,
  shallow = false
) => {
  const href = `/products/?${encodeURIComponent(
    newCategory
  )}=${encodeURIComponent(newTag)}`
  router.push(href, href, { shallow }).then(() => window.scrollTo(0, 0))
}
