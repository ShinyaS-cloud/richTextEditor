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
      users: { id: 0, name: '' }
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

type argType = { categoryName: string; usersId: number }

export const fetchArticleListCategory = createAsyncThunk(
  '/api/articleCategory',
  async (arg: argType) => {
    try {
      const { categoryName, usersId } = arg
      let indexOfCategory = categories.indexOf(categoryName)
      if (categories.indexOf(categoryName) === -1) {
        indexOfCategory = 0
      }
      const { data } = await axios.get('/api/articleCategory', {
        params: {
          categoryNumber: indexOfCategory,
          usersId: usersId
        }
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
 * Reducer
 */

const articleListReducer = createSlice({
  name: 'articleListReducer',
  initialState: initialState,
  reducers: {
    articleInit: (state, action: PayloadAction) => ({
      ...state,
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleListCategory.fulfilled, (state, response) => ({
        ...state,
        article: response.payload,
        loading: false
      }))
      .addCase(fetchArticleListCategory.pending, (state) => ({
        ...initialState,
        loading: true
      }))
      .addCase(fetchArticleListCategory.rejected, (state) => ({ ...state, loading: false }))
  }
})

export default articleListReducer
