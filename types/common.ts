export interface Post {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  content: any
}

export interface Author {
  name: string
  picture: string
}
