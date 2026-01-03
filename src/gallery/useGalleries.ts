import type { GalleryDescription, GalleryDescriptionWithPath } from "./types.ts"

export function useGalleries(): GalleryDescriptionWithPath[] {
  const galleries = import.meta.glob<GalleryDescription>("../../public/galleries/*/gallery.ts", {
    import: "default",
    eager: true,
  })
  return Object.keys(galleries).map((path) => ({ path: path.replace(/gallery.ts$/, ""), ...galleries[path] }))
}
