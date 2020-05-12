import sanityImage from "@sanity/image-url"
import client, { previewClient } from "lib/sanity"
import type { Post } from "types/common"

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
  coverImage,
  'author': author->{name, picture},
`

const getClient = (preview: boolean) => (preview ? previewClient : client)

export const imageBuilder = sanityImage(client)

export const getPreviewPostBySlug = async (
  slug: string | string[]
): Promise<Post> => {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  )
  return data[0]
}

export const getAllPostsWithSlug = async () => {
  const data = await client.fetch<Post[]>(
    `*[_type == "post"]{ 'slug': slug.current }`
  )
  return data
}

export const getAllPostsForHome = async (preview: boolean) => {
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
