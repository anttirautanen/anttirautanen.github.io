import type { GalleryDescriptionWithPath } from "./types.ts"
import { Gallery } from "./Gallery.tsx"

interface GalleryProps {
  galleries: GalleryDescriptionWithPath[]
}

export const GalleryList = ({ galleries }: GalleryProps) => (
  <div>
    {galleries.map((gallery) => (
      <Gallery key={gallery.path} gallery={gallery} />
    ))}
  </div>
)
