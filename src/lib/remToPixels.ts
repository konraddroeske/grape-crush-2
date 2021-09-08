// eslint-disable-next-line import/prefer-default-export
export const remToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
