import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ContentState, convertToRaw } from 'draft-js'
axios.defaults.withCredentials = true

export const initialState = {
  article: [
    {
      articleId: 0,
      title: '',
      imageUrl: '',
      category: 0,
      content: convertToRaw(ContentState.createFromText('')),
      userId: 0,
      createdAt: '',
      updatedAt: ''
    }
  ],
  loading: false
}

const categories = ['pet', 'sports', 'novel', 'IT', 'food']

/**
 * Data型をyyyy年mm月dd日に変更する関数
 */

const traslateDate = (day: string): string => {
  const newDay = new Date(day)
  return newDay.getFullYear() + '年' + (newDay.getMonth() + 1) + '月' + newDay.getDate() + '日'
}

/**
 * ArticleをCategoryごとに持ってくる
 */

export const fetchArticleCategory = createAsyncThunk(
  '/api/articleCategory',
  async (categoryName: string) => {
    try {
      const { data } = await axios.get('/api/articleCategory', {
        params: { categoryName: categories.indexOf(categoryName) }
      })
      data.map((r: typeof initialState.article[0]) => {
        r.createdAt = traslateDate(r.createdAt)
        r.updatedAt = traslateDate(r.updatedAt)
        return r
      })

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

/**
 * 選択したArticleを一つ持ってくる
 */

export const fetchArticle = createAsyncThunk('/api/article', async (articleId: number) => {
  try {
    const { data } = await axios.get('/api/article', {
      params: { articleId: articleId }
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

const postReducer = createSlice({
  name: 'postReducer',
  initialState: initialState,
  reducers: {
    articleInit: (state, action: PayloadAction) => ({
      ...state,
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleCategory.fulfilled, (state, response) => ({
        ...state,
        article: response.payload,
        loading: false
      }))
      .addCase(fetchArticleCategory.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchArticleCategory.rejected, (state) => ({ ...state, loading: false }))

    builder
      .addCase(fetchArticle.fulfilled, (state, response) => ({
        ...state,
        article: [response.payload],
        loading: false
      }))
      .addCase(fetchArticle.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchArticle.rejected, (state) => ({ ...state, loading: false }))
  }
})

export default postReducer
