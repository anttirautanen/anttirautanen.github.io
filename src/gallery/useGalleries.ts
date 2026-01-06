import type { GalleryDescription, GalleryDescriptionWithPath } from "@anttirautanen/gallery"

export function useGalleries(): GalleryDescriptionWithPath[] {
  const galleries = import.meta.glob<GalleryDescription>("../../public/galleries/*/gallery.ts", {
    import: "default",
    eager: true,
  })
  return Object.keys(galleries)
    .map((path) => {
      const imageImportPath = path.replace(/gallery.ts$/, "").replace(/^\.\.\/public/, "")
      return { path: imageImportPath, ...galleries[path] }
    })
    .sort((galleryA, galleryB) => galleryB.date.localeCompare(galleryA.date))
}
