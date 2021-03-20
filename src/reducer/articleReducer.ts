import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ContentState, convertToRaw } from 'draft-js'

export const initialState = {
  article: {
    id: 0,
    title: '',
    imageUrl: '',
    category: 0,
    content: convertToRaw(ContentState.createFromText('')),
    userId: 0,
    createdAt: '',
    updatedAt: '',
    user: { name: '', codename: '', avatarUrl: '' }
  },
  loading: false
}

/**
 * Data型をyyyy年mm月dd日に変更する関数
 */

const traslateDate = (day: string): string => {
  const newDay = new Date(day)
  return newDay.getFullYear() + '年' + (newDay.getMonth() + 1) + '月' + newDay.getDate() + '日'
}

/**
 * 選択したArticleを一つ持ってくる
 */

export const fetchArticle = createAsyncThunk('/api/article', async (articleId: number) => {
  try {
    const { data } = await axios.get('/api/article', {
      params: { id: articleId }
    })
    data.createdAt = traslateDate(data.createdAt)
    data.updatedAt = traslateDate(data.updatedAt)
    return data
  } catch (error) {
    console.log(error)
  }
})

/**
 * Reducer
 */

const articleReducer = createSlice({
  name: 'articleReducer',
  initialState: initialState,
  reducers: {
    articleInit: (state, action: PayloadAction) => ({
      ...state,
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.fulfilled, (state, response) => ({
        ...state,
        article: response.payload,
        loading: false
      }))
      .addCase(fetchArticle.pending, (state) => ({
        ...initialState,
        loading: true
      }))
      .addCase(fetchArticle.rejected, (state) => ({ ...state, loading: false }))
  }
})

export default articleReducer
