import BlockContent from "@sanity/block-content-to-react"
import React from "react"
import type { Post } from "../types/common"
import markdownStyles from "./markdown-styles.module.css"

type Props = Pick<Post, "content">

const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <BlockContent blocks={content} className={markdownStyles.markdown} />
    </div>
  )
}
export default PostBody
