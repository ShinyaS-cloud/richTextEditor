import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  id: 0,
  title: '',
  imageUrl: '',
  category: 0,
  content: JSON.stringify({}),
  userId: 0
}

const categories = {
  pet: { id: 0, name: 'pet' },
  sports: { id: 1, name: 'sports' },
  novel: { id: 2, name: 'novel' },
  IT: { id: 3, name: 'IT' },
  food: { id: 4, name: 'food' },
  twitter: { id: 5, name: 'twitter' }
}

type CategoryTypes = keyof typeof categories

export const fetchPost = createAsyncThunk('/api/post', async (categoryName: CategoryTypes) => {
  const response = await axios.get('/api/post', { params: categoryName })
  return response.data
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
      .addCase(fetchPost.fulfilled, (state, response) => ({ ...state, ...response.payload }))

      .addCase(fetchPost.rejected, (state) => console.log(state))
  }
})

export default postReducer
