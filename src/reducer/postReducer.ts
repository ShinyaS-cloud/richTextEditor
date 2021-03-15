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
  ]
}

const categories = ['pet', 'sports', 'novel', 'IT', 'food']

// type CategoryTypes = keyof typeof categories

const traslateDate = (day: string): string => {
  const newDay = new Date(day)
  return newDay.getFullYear() + '年' + (newDay.getMonth() + 1) + '月' + newDay.getDate() + '日'
}

export const fetchArticleCategory = createAsyncThunk(
  '/api/articleCategory',
  async (categoryName: string) => {
    try {
      const { data } = await axios.get('/api/articleCategory', {
        params: { categoryName: categories.indexOf(categoryName) }
      })
      data.map((r: any) => {
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

const postReducer = createSlice({
  name: 'postReducer',
  initialState: initialState,
  reducers: {
    postInit: (state, action: PayloadAction) => ({
      ...state
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleCategory.fulfilled, (state, response) => ({
        ...state,
        article: response.payload
      }))

      .addCase(fetchArticleCategory.rejected, (state) => console.log(state))

    builder
      .addCase(fetchArticle.fulfilled, (state, response) => ({
        ...state,
        article: response.payload
      }))
      .addCase(fetchArticle.rejected, (state) => console.log(state))
  }
})

export default postReducer
