import { Asset } from "contentful-management/types"

export interface HeroSlides {
  title: string
  image: Asset["fields"]
}

export enum Direction {
  Left,
  Right,
}
