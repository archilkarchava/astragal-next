import Avatar from "components/Avatar"
import CoverImage from "components/CoverImage"
import Date from "components/Date"
import Link from "next/link"
import React from "react"
import type { Post } from "types/common"

type Props = Omit<Post, "content">

const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} url={coverImage} />
      </div>
      <div className="mb-20 md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}

export default HeroPost
