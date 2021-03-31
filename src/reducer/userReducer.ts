import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const initialState = {
  id: 0,
  name: '',
  introduction: '',
  avatarUrl: '',
  headerUrl: '',
  codename: '',
  isFollow: false,
  followerCount: 0,
  followeeCount: 0
}

export const fetchProfile = createAsyncThunk('/api/profile', async (codename: string) => {
  const { data } = await axios.get('/api/profile', {
    params: { codename }
  })
  return data
})

const userReducer = createSlice({
  name: 'userReducer',
  initialState: initialState,
  reducers: {
    userInit: (state, action: PayloadAction) => ({
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, response) => ({ ...state, ...response.payload }))

      .addCase(fetchProfile.rejected, (state) => console.log(state))
  }
})

export default userReducer
