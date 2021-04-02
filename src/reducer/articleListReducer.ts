import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  article: [
    {
      id: 0,
      title: '',
      imageUrl: '',
      category: 0,
      userId: 0,
      abstract: '',
      createdAt: '',
      updatedAt: '',
      isFavorite: false,
      favoriteCount: 0,
      isPublic: false,
      user: { name: '', codename: '', avatarUrl: '' }
    }
  ],
  hasMore: true,
  loading: false
}

/**
 * Data型をyyyy年mm月dd日に変更する関数
 */

const translateDate = (day: string): string => {
  const newDay = new Date(day)
  return newDay.getFullYear() + '年' + (newDay.getMonth() + 1) + '月' + newDay.getDate() + '日'
}

/**
 * Articleをtypeごとに持ってくる
 */

type argType = {
  categoryNumber: number
  userId: number
  next: number
  type: 'user' | 'favorite' | 'category' | 'comment'
}

export const fetchArticleList = createAsyncThunk('/api/articleList/', async (arg: argType) => {
  try {
    const { categoryNumber, userId, next, type } = arg
    let indexOfCategory = categoryNumber
    if (categoryNumber === -1) {
      indexOfCategory = 0
    }
    const { data } = await axios.get('/api/articleList/', {
      params: {
        categoryNumber: indexOfCategory,
        userId,
        next,
        type
      }
    })

    data.map((r: typeof initialState.article[0]) => {
      r.createdAt = translateDate(r.createdAt)
      r.updatedAt = translateDate(r.updatedAt)
      return r
    })

    return data
  } catch (error) {
    console.log(error)
  }
})

/**
 * Reducer
 */

const articleListReducer = createSlice({
  name: 'articleListReducer',
  initialState: initialState,
  reducers: {
    articleInit: (state, action: PayloadAction) => ({
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.fulfilled, (state, response) => ({
        ...state,
        article: [...state.article, ...response.payload],
        hasMore: !!response.payload.length,
        loading: false
      }))
      .addCase(fetchArticleList.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchArticleList.rejected, (state) => ({ ...state, loading: false }))
  }
})

export default articleListReducer
