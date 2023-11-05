import { createSlice } from '@reduxjs/toolkit'

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    isDark: false,
  },
  reducers: {
    setIsDark: (state, action) => {
      return ({
        ...state,
        isDark: action.payload
      })
    },
  },
})
