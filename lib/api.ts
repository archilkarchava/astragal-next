import sanityImage from "@sanity/image-url"
import type { Post } from "../types/common"
import client, { previewClient } from "./sanity"
import { syncCmsImages } from "./utils"

const getUniquePosts = (posts: Post[]) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    }
    slugs.add(post.slug)
    return true
  })
}

const postFields = `
  name,
  title,
  date,
  excerpt,
  'slug': slug.current,
  'coverImage': '/assets/optimized/' + coverImage.asset->path,
  'author': author->{name, 'picture': '/assets/optimized/' + picture.asset->path},
`

const getClient = (preview: boolean) => (preview ? previewClient : client)

export const imageBuilder = sanityImage(client)

export const getPreviewPostBySlug = async (slug: string | string[]) => {
  const data = await getClient(true).fetch<Post[]>(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  )
  return data[0]
}

export const getAllPostsWithSlug = async () => {
  await syncCmsImages()
  const data = await client.fetch<Post[]>(
    `*[_type == "post"]{ 'slug': slug.current }`
  )
  return data
}

export const getAllPostsForHome = async (preview: boolean) => {
  await syncCmsImages()
  const results = await getClient(preview).fetch<
    Post[]
  >(`*[_type == "post"] | order(date desc, _updatedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getPostAndMorePosts(
  slug: string | string[],
  preview: boolean
) {
  await syncCmsImages()
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch<Post[]>(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch<Post[]>(
      `*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${postFields}
        content,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}
