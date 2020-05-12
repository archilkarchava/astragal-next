import Container from "components/Container"
import Header from "components/Header"
import Layout from "components/Layout"
import MoreStories from "components/MoreStories"
import PostBody from "components/PostBody"
import PostHeader from "components/PostHeader"
import PostTitle from "components/PostTitle"
import SectionSeparator from "components/SectionSeparator"
import { getAllPostsWithSlug, getPostAndMorePosts } from "lib/api"
import { CMS_NAME } from "lib/constants"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import ErrorPage from "next/error"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import type { Post } from "types/common"

interface Props {
  post: Post
  morePosts: Post[]
  preview: boolean
}

const PostPage: NextPage<Props> = ({ post, morePosts, preview }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  if (!params) {
    console.error("Error: there were no params provided")
  }
  const data = await getPostAndMorePosts(params?.slug ?? "", preview)
  return {
    props: {
      preview,
      post: data.post || null,
      morePosts: data.morePosts || null,
    },
    unstable_revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  }
}

export default PostPage
