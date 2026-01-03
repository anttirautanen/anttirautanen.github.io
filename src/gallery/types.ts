export interface GalleryDescription {
  name: string
  date: string
  imageCount: number
  captions: string[]
  grid: string
}

export interface GalleryDescriptionWithPath extends GalleryDescription {
  path: string
}

export type GalleryModule = {
  default: GalleryDescription
}
