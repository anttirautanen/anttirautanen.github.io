import type { GalleryDescriptionWithPath } from "./types.ts"
import styled, { css } from "styled-components"
import { Suspense, use, useEffect } from "react"

interface GalleryProps {
  gallery: GalleryDescriptionWithPath
}

function getThumbImagePaths(gallery: GalleryDescriptionWithPath): Promise<string[]> {
  return new Promise((resolve) => {
    const thumbImageModules: Promise<any>[] = []
    for (let i = 0; i < gallery.imageCount; i++) {
      thumbImageModules.push(import(`${gallery.path}thumbs/${i + 1}.jpeg`))
    }

    Promise.all(thumbImageModules).then((thumbImageModules) => {
      const imagePaths = thumbImageModules.map((mod) => mod.default)
      resolve(imagePaths)
    })
  })
}

export const Gallery = ({ gallery }: GalleryProps) => {
  const thumbImagePathsPromise = getThumbImagePaths(gallery)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        window.innerWidth - document.documentElement.clientWidth + "px"
      )
    })

    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div>
      <Heading>{gallery.name}</Heading>
      <Suspense fallback={<div>LOADING IMAGE...</div>}>
        <ThumbGallery gallery={gallery} thumbImagePathsPromise={thumbImagePathsPromise} />
      </Suspense>
    </div>
  )
}

interface ThumbGalleryProps {
  gallery: GalleryDescriptionWithPath
  thumbImagePathsPromise: Promise<string[]>
}

const ThumbGallery = ({ gallery, thumbImagePathsPromise }: ThumbGalleryProps) => {
  const thumbImagesPaths = use(thumbImagePathsPromise)
  const rows = gallery.grid.match(/".*"/g)
  if (!rows) {
    return (
      <Error>
        Could not detect row count.<pre>{gallery.grid}</pre>
      </Error>
    )
  }

  const firstGridRowMatch = gallery.grid.match(/"(.*)"/)
  if (!firstGridRowMatch || !firstGridRowMatch[1]) {
    return (
      <Error>
        Could not detect column count.<pre>{gallery.grid}</pre>
      </Error>
    )
  }

  const rowCount = rows.length
  const firstGridRowDefinition = firstGridRowMatch[1]
  const columnCount = firstGridRowDefinition.split(" ").length
  const horizontalPadding = 4

  return (
    <ThumbGalleryContainer
      $areas={gallery.grid}
      $padding={horizontalPadding}
      $columnCount={columnCount}
      $rowCount={rowCount}
    >
      {thumbImagesPaths.map((path, index) => (
        <ImageContainer key={path} $area={areaLetters[index]}>
          <Caption>{gallery.captions[index]}</Caption>
          <Image $imagePath={path} />
        </ImageContainer>
      ))}
    </ThumbGalleryContainer>
  )
}

const Heading = styled.h2`
  justify-self: center;
  background-color: #fff9f3;
  clip-path: polygon(0.1em 0.05em, 100% 0, calc(100% - 0.2em) 100%, 0.2em calc(100% - 0.1em));
  font-family: monospace;
  font-weight: 700;
  font-size: 3em;
  letter-spacing: 0.02em;
  margin: 0 0 -1em 0;
  padding: 0.5em 1em;
  text-align: center;
  text-shadow: 0 0 1em rgba(255, 255, 0, 0.5);
`

const Error = styled.div`
  background: #b11b07;
  color: #fff;
  font-weight: 600;
  padding: 4vw;
`

const ThumbGalleryContainer = styled.div<{
  $areas: string
  $padding: number
  $columnCount: number
  $rowCount: number
}>`
  background: #000;
  display: grid;
  gap: 2vw;
  padding: ${({ $padding }) => $padding}vw;

  ${({ $areas, $columnCount, $rowCount, $padding }) => {
    const gaps = `${($columnCount - 1) * 2}vw`
    const fullWidth = css`calc(100vw - ${$padding}vw - ${$padding}vw - ${gaps} - var(--scrollbar-width))`
    const cellSize = css`calc(${fullWidth} / ${$columnCount})`
    return css`
      grid-template-areas: ${$areas};
      grid-template-columns: repeat(${$columnCount}, ${cellSize});
      grid-template-rows: repeat(${$rowCount}, ${cellSize});
    `
  }}
`

const Caption = styled.div`
  background: #000;
  clip-path: polygon(0.1em 0.05em, 100% 0, calc(100% - 0.2em) 100%, 0.2em calc(100% - 0.1em));
  color: #fff9f3;
  font-family: monospace;
  left: 1em;
  margin-right: 1em;
  opacity: 0;
  padding: 0.5em 1em;
  position: absolute;
  top: 0;
  transition: all 0.1s;
`

const ImageContainer = styled.div<{ $area: string }>`
  display: grid;
  grid-area: ${({ $area }) => $area};
  position: relative;

  &:hover ${Caption} {
    opacity: 1;
    top: 1em;
  }
`
const Image = styled.div<{ $imagePath: string }>`
  background-image: url("${({ $imagePath }) => $imagePath}");
  background-size: cover;
  background-position: center;
`

const areaLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]
