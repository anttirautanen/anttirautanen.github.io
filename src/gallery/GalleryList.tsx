import type { GalleryDescriptionWithPath } from "@anttirautanen/gallery"
import { Gallery } from "@anttirautanen/gallery"

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
