import PostPreview from "components/PostPreview"
import React from "react"
import type { Post } from "types/common"

interface Props {
  posts: Post[]
}

const MoreStories: React.FC<Props> = ({ posts }) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="grid grid-cols-1 row-gap-20 mb-32 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 md:row-gap-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
export default MoreStories
