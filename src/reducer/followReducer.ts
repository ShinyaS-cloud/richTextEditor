import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const initialState = {
  id: 0,
  toFollow: [{ name: '', avatarUrl: '', introduction: '', codename: '' }],
  fromFollow: [{ name: '', avatarUrl: '', introduction: '', codename: '' }]
}

export const fetchFollow = createAsyncThunk('/api/followList', async (fromUserId: number) => {
  const response = await axios.get('/api/followList', { params: { fromUserId } })
  return response.data
})
export const fetchFollowee = createAsyncThunk('/api/followeeList', async (toUserId: number) => {
  const response = await axios.get('/api/followeeList', { params: { toUserId } })
  return response.data
})

const followReducer = createSlice({
  name: 'followReducer',
  initialState: initialState,
  reducers: {
    followInit: (state, action: PayloadAction) => ({
      ...state
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFollow.fulfilled, (state, response) => ({
        ...state,
        toFollow: response.payload
      }))

      .addCase(fetchFollow.pending, (state) => ({
        ...initialState,
        loading: true
      }))
      .addCase(fetchFollow.rejected, (state) => console.log(state))
    builder
      .addCase(fetchFollowee.fulfilled, (state, response) => ({
        ...state,
        fromFollow: response.payload
      }))

      .addCase(fetchFollowee.pending, (state) => ({
        ...initialState,
        loading: true
      }))
      .addCase(fetchFollowee.rejected, (state) => console.log(state))
  }
})

export default followReducer
