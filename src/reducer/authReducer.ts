import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const initialState = {
  id: 0,
  name: '',
  codename: '',
  introduction: '',
  avatarUrl: '',
  headerUrl: '',
  authUserId: 0,
  isLoggedIn: false
}

export const fetchUser = createAsyncThunk('/api/current_user', async () => {
  const { data } = await axios.get('/api/current_user')
  return data
})

const authReducer = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    userInit: (state, action: PayloadAction) => ({
      ...initialState
    })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, response) => ({ ...state, ...response.payload }))

      .addCase(fetchUser.rejected, (state) => console.log(state))
  }
})

export default authReducer
