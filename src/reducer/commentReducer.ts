import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  commentArray: [
    {
      comment: {
        id: 0,
        comment: ''
      },
      user: { name: '', codename: '', avatarUrl: '' }
    }
  ],
  loading: false
}

/**
 * 選択したarticleのcommentを持ってくる
 */

export const fetchComment = createAsyncThunk('/api/comment', async (articleId: number) => {
  try {
    const { data } = await axios.get('/api/comment', {
      params: { articleId }
    })

    return data
  } catch (error) {
    console.log(error)
  }
})

/**
 * Reducer
 */

const commentReducer = createSlice({
  name: 'commentReducer',
  initialState: initialState,
  reducers: {
    commentInit: (state, action: PayloadAction) => ({
      ...state,
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.fulfilled, (state, response) => ({
        ...state,
        commentArray: [...state.commentArray, ...response.payload],
        loading: false
      }))
      .addCase(fetchComment.pending, (state) => ({
        ...initialState,
        loading: true
      }))
      .addCase(fetchComment.rejected, (state) => ({ ...state, loading: false }))
  }
})

export default commentReducer
