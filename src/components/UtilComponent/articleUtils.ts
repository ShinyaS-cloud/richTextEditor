import { ContentState, convertToRaw } from 'draft-js'

export const initialState = {
  id: 0,
  title: '',
  imageUrl: '',
  category: 0,
  content: convertToRaw(ContentState.createFromText('')),
  userId: 0,
  createdAt: '',
  updatedAt: '',
  isFavorite: false,
  favoriteCount: 0,
  isPublic: false,
  user: { name: '', codename: '', avatarUrl: '' }
}

/**
 * Data型をyyyy年mm月dd日に変更する関数
 */

export const translateDate = (day: string): string => {
  const newDay = new Date(day)
  return newDay.getFullYear() + '年' + (newDay.getMonth() + 1) + '月' + newDay.getDate() + '日'
}
