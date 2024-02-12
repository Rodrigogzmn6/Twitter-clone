export interface Trend {
  key: number
  where: string
  name: string
  posts: number
}

export interface User {
  id: string
  email: string
  tweets: string[]
  friends: User[]
  profile: string
}
