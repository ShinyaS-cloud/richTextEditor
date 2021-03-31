import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const initialState = {
  follower: [{ name: '', avatarUrl: '', introduction: '', codename: '' }],
  followee: [{ name: '', avatarUrl: '', introduction: '', codename: '' }]
}

export const fetchFollower = createAsyncThunk('/api/followerList', async (userId: number) => {
  const { data } = await axios.get('/api/followerList', { params: { userId } })
  return data
})
export const fetchFollowee = createAsyncThunk('/api/followeeList', async (userId: number) => {
  const { data } = await axios.get('/api/followeeList', { params: { userId } })
  return data
})

const followReducer = createSlice({
  name: 'followReducer',
  initialState: initialState,
  reducers: {
    followInit: (state, action: PayloadAction) => ({
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFollower.fulfilled, (state, response) => ({
        ...state,
        follower: [...state.follower, ...response.payload]
      }))

      .addCase(fetchFollower.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchFollower.rejected, (state) => console.log(state))
    builder
      .addCase(fetchFollowee.fulfilled, (state, response) => ({
        ...state,
        followee: [...state.followee, ...response.payload]
      }))

      .addCase(fetchFollowee.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(fetchFollowee.rejected, (state) => console.log(state))
  }
})

export default followReducer
