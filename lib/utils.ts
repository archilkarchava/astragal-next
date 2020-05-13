import fs from "fs"
import path from "path"
import readdirp from "readdirp"
import sharp from "sharp"
import client from "./sanity"

const cmsCDN = "https://cdn.sanity.io"
const assetsDir = path.join(process.cwd(), "public", "assets")

export const fetchImagePathsFromCMS = async () => {
  const data = await client.fetch<string[]>(
    `*[_type == "sanity.imageAsset"].path`
  )
  return data
}

const optimizeImages = (imgPaths: string[]) => {
  const optimizedAssetsDir = path.join(
    process.cwd(),
    "public",
    "assets",
    "optimized"
  )
  return imgPaths.flatMap(async (img) => {
    const imgFullPath = path.join(assetsDir, img)
    const outputPath = path.join(optimizedAssetsDir, img)
    if (fs.existsSync(outputPath)) {
      return []
    }
    await fs.promises.mkdir(path.dirname(outputPath), {
      recursive: true,
    })
    return [await sharp(imgFullPath).resize(1000, 500).toFile(outputPath)]
  })
}

const downloadFile = async (url: string, outputPath: string) => {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  await fs.promises.mkdir(path.dirname(outputPath), {
    recursive: true,
  })
  await fs.promises.writeFile(outputPath, Buffer.from(arrayBuffer))
}

export const syncCmsImages = async () => {
  const cmsAssets = await fetchImagePathsFromCMS()

  const localAssets = (
    await readdirp.promise(assetsDir, {
      directoryFilter: "!optimized",
      type: "files",
    })
  ).map((p) => p.path.replace(/\\/g, "/"))

  const imagesToDownload = cmsAssets.filter(
    (imgPath) => !localAssets.includes(imgPath)
  )
  const imagesToRemove = localAssets.filter(
    (imgPath) => !cmsAssets.includes(imgPath)
  )

  if (imagesToDownload.length) {
    await Promise.all(
      imagesToDownload.map((img) => {
        return downloadFile(`${cmsCDN}/${img}`, path.join(assetsDir, img))
      })
    )

    console.log(
      `Downloaded images from CMS: ${imagesToDownload
        .map((img) => path.basename(img))
        .join(", ")}`
    )
  }
  if (imagesToRemove.length) {
    await Promise.all(
      imagesToRemove.map((img) => {
        return fs.promises.unlink(path.join(assetsDir, img))
      })
    )
    console.log(
      `Removed local images: ${imagesToRemove
        .map((img) => path.basename(img))
        .join(", ")}`
    )
  }
  await Promise.all(optimizeImages(localAssets))
}
