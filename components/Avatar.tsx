import React from "react"
import type { Author } from "../types/common"

type Props = Author

const Avatar: React.FC<Props> = ({ name, picture }) => {
  return (
    <div className="flex items-center">
      <img src={picture} className="w-12 h-12 mr-4 rounded-full" alt={name} />
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
