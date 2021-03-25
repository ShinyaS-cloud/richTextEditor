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
  toFollowCount: 0,
  fromFollowCount: 0
}

type argType = {
  codename: string
  authUserId: number
}

export const fetchProfile = createAsyncThunk('/api/profile', async (arg: argType) => {
  const { data } = await axios.get('/api/profile', {
    params: { ...arg }
  })
  return data
})

const userReducer = createSlice({
  name: 'userReducer',
  initialState: initialState,
  reducers: {
    userInit: (state, action: PayloadAction) => ({
      ...state
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, response) => ({ ...state, ...response.payload }))

      .addCase(fetchProfile.rejected, (state) => console.log(state))
  }
})

export default userReducer
