import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import React from "react"
import Container from "../components/Container"
import HeroPost from "../components/HeroPost"
import Intro from "../components/Intro"
import Layout from "../components/Layout"
import MoreStories from "../components/MoreStories"
import { getAllPostsForHome } from "../lib/api"
import { CMS_NAME } from "../lib/constants"
import type { Post } from "../types/common"

interface Props {
  allPosts: Post[]
  preview: boolean
}

const IndexPage: NextPage<Props> = ({ allPosts, preview }) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
    unstable_revalidate: 1,
  }
}

export default IndexPage
