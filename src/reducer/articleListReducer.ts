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
      createdAt: '',
      updatedAt: '',
      isFavorite: false,
      favoriteCount: 0,
      user: { name: '', codename: '', avatarUrl: '' }
    }
  ],
  hasMore: true,
  loading: false
}

const categories = ['pet', 'sports', 'novel', 'IT', 'food']

/**
 * Data型をyyyy年mm月dd日に変更する関数
 */

const translateDate = (day: string): string => {
  const newDay = new Date(day)
  return newDay.getFullYear() + '年' + (newDay.getMonth() + 1) + '月' + newDay.getDate() + '日'
}

/**
 * ArticleをCategoryごとに持ってくる
 */

type argType = { categoryName: string; userId: number; next: number }

export const fetchArticleListCategory = createAsyncThunk(
  '/api/articleList',
  async (arg: argType) => {
    try {
      const { categoryName, userId, next } = arg
      let indexOfCategory = categories.indexOf(categoryName)
      if (categories.indexOf(categoryName) === -1) {
        indexOfCategory = 0
      }
      const { data } = await axios.get('/api/articleList', {
        params: {
          categoryNumber: indexOfCategory,
          userId,
          next
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
  }
)

/**
 * Article を userごとに持ってくる
 */

export const fetchArticleListUser = createAsyncThunk(
  '/api/articleList/user',
  async (userId: number) => {
    try {
      const { data } = await axios.get('/api/articleList/user', {
        params: { userId }
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
  }
)

/**
 * userがお気に入りしたarticleを持ってくる
 */

export const fetchArticleListFavorite = createAsyncThunk(
  '/api/articleList/favorite',
  async (userId: number) => {
    try {
      const { data } = await axios.get('/api/articleList/favorite', {
        params: { userId }
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
  }
)

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
      .addCase(fetchArticleListCategory.fulfilled, (state, response) => ({
        ...state,
        article: [...state.article, ...response.payload],
        hasMore: Boolean(response.payload.length),
        loading: false
      }))
      .addCase(fetchArticleListCategory.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchArticleListCategory.rejected, (state) => ({ ...state, loading: false }))
    builder
      .addCase(fetchArticleListUser.fulfilled, (state, response) => ({
        ...state,
        article: response.payload,
        loading: false
      }))
      .addCase(fetchArticleListUser.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchArticleListUser.rejected, (state) => ({ ...state, loading: false }))
    builder
      .addCase(fetchArticleListFavorite.fulfilled, (state, response) => ({
        ...state,
        article: response.payload,
        loading: false
      }))
      .addCase(fetchArticleListFavorite.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchArticleListFavorite.rejected, (state) => ({ ...state, loading: false }))
  }
})

export default articleListReducer
