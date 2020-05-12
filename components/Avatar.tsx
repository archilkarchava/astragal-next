import { imageBuilder } from "lib/api"
import React from "react"
import type { Author } from "types/common"

type Props = Author

const Avatar: React.FC<Props> = ({ name, picture }) => {
  return (
    <div className="flex items-center">
      <img
        src={
          imageBuilder
            .image(picture)
            .withOptions({ auto: "format", quality: 80, width: 200 })
            .url() ?? ""
        }
        className="w-12 h-12 mr-4 rounded-full"
        alt={name}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
