// eslint-disable-next-line import/prefer-default-export
export const compareArrays = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  return arr1.every((value: string, index: number) => value === arr2[index])
}
