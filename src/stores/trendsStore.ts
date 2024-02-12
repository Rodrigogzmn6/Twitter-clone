import { create } from 'zustand'
import { type Trend } from '../types'

interface TrendState {
  trends: Trend[]
  fetchTrends: () => Promise<void>
}

export const useTrendsStore = create<TrendState>((set) => {
  return {
    trends: [],
    fetchTrends: async () => {
      const res = await fetch('http://localhost:5173/trends.json')
      const json = await res.json()
      set({ trends: json })
    }
  }
})
