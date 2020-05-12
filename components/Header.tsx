import Link from "next/link"
import React from "react"

const Header: React.FC = () => {
  return (
    <h2 className="mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/">
        <a className="hover:underline">Blog</a>
      </Link>
      .
    </h2>
  )
}

export default Header
