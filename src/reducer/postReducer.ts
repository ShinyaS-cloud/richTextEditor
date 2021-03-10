import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = { postId: 0, title: '', imageUrl: '', userId: 0 }

export const fetchPost = createAsyncThunk('/api/post', async () => {
  const response = await axios.get('/api/post')
  return response.data
})

const postReducer = createSlice({
  name: 'postReducer',
  initialState: initialState,
  reducers: {
    userInit: (state, action: PayloadAction) => ({
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
