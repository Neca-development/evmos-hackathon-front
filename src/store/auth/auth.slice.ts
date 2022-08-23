import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token:
    (typeof window != 'undefined' && localStorage && localStorage.getItem('token')) ||
    null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
    },
    refreshToken: (state, action: PayloadAction<{ token: string }>) => {
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
    },
    init: (state) => {
      state.token = (localStorage && localStorage.getItem('token')) || null
    },
    logout: (state) => {
      localStorage.clear()
      state.token = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logout, refreshToken } = authSlice.actions

export default authSlice.reducer
