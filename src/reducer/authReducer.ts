import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = { googleId: '', __v: 0, _id: '', credits: 0 }

export const fetchUser = createAsyncThunk('/api/current_user', async () => {
  const response = await axios.get('/api/current_user')

  return response.data
})

const authReducer = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    userInit: (state, action: PayloadAction) => ({
      ...state
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, response) => ({ ...state, ...response.payload }))

      .addCase(fetchUser.rejected, (state) => console.log(state))
  }
})

export default authReducer
