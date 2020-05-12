import Avatar from "components/Avatar"
import CoverImage from "components/CoverImage"
import Date from "components/Date"
import PostTitle from "components/PostTitle"
import React from "react"
import type { Post } from "types/common"

type Props = Omit<Post, "excerpt" | "slug" | "content">

const PostHeader: React.FC<Props> = ({ title, coverImage, date, author }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 -mx-5 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block mb-6 md:hidden">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
export default PostHeader
