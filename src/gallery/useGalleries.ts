import type { GalleryDescriptionWithPath, GalleryModule } from "./types.ts"

export function useGalleries(): GalleryDescriptionWithPath[] {
  const galleries = import.meta.glob<GalleryModule>("./*/gallery.ts", { eager: true })
  return Object.keys(galleries).map((path) => ({ path: path.replace(/gallery.ts$/, ""), ...galleries[path].default }))
}
