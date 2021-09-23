// eslint-disable-next-line import/prefer-default-export
export enum Direction {
  Left = 1,
  Right = -1,
}

export interface ImageData {
  url: string | undefined
  alt: string | undefined
  width: number | undefined
  height: number | undefined
}
