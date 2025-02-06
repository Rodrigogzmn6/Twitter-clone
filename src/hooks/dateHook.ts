import { type Tweet } from '../types'

export const useDateHook = () => {
  function getTweetTime (tweet: Tweet) {
    const dateNow = new Date()
    const validTweetTime = tweet.date.seconds * 1000 + tweet.date.nanoseconds / 1000000
    const tweetTime = new Date(validTweetTime)
    const milisecondsDiff = dateNow.getTime() - tweetTime.getTime()

    const dayDiff = Math.floor(milisecondsDiff / (1000 * 60 * 60 * 24))
    const hourDiff = Math.floor(milisecondsDiff / (1000 * 60 * 60))
    const minDiff = Math.floor(milisecondsDiff / (1000 * 60))

    if (dayDiff > 0) {
      return `${dayDiff}d`
    } else if (hourDiff > 0) {
      return `${hourDiff}h`
    } else {
      return `${minDiff}min`
    }
  }

  return { getTweetTime }
}
