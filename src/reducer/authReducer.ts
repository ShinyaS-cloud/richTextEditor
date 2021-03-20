import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const initialState = {
  id: 0,
  googleId: '',
  email: '',
  loginGoogle: false,
  password: '',
  codename: '',
  avatarUrl: '',
  headerUrl: ''
}

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
