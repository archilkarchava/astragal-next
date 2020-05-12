import cn from "classnames"
import { imageBuilder } from "lib/api"
import Link from "next/link"
import React from "react"

interface Props {
  title: string
  url: string
  slug?: string
}

// type Props = Pick<Post, "title" | "slug">

const CoverImage: React.FC<Props> = ({ title, url, slug }) => {
  const image = (
    <img
      width={2000}
      height={1000}
      alt={`${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={
        imageBuilder
          .image(url)
          .withOptions({
            auto: "format",
            quality: 80,
            height: 500,
            width: 1000,
          })
          .url() ?? ""
      }
    />
  )

  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
