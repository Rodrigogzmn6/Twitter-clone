export interface Trend {
  key: number
  where: string
  name: string
  posts: number
}

export interface User {
  id: string
  email: string
  tweets: Tweet[]
  friends: string[]
  profile: string
}

export interface Tweet {
  id: string
  userName: string
  userProfile: string
  tweet: string
  date: Date
}
