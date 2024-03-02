import { createSlice } from '@reduxjs/toolkit'
import { addAdminsFetch, getAllComptes } from '../actions';

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    latestPayload: null,
    latestType: null,
    systemStatus: null,
    registerError: null,
    isDark: false,
    allComptes: [],
  },
  reducers: {
    setIsDark: (state, action) => {
      return ({
        ...state,
        isDark: action.payload
      })
    },
  },
  extraReducers: (builder) => {
    //////INIT
    builder
      .addCase(getAllComptes.pending, (state, { payload }) => {
        state.systemStatus = "pending"
        state.latestPayload = null
        state.latestType = null
      })

      .addCase(getAllComptes.fulfilled, (state, action) => {
        // console.log("addTablesFetch.fulfilled: ", action.payload)
        state.allComptes = action.payload
        state.systemStatus = "success"
        state.latestPayload = action.payload
        state.latestType = action.type
      })

      .addCase(getAllComptes.rejected, (state, action) => {
        state.systemStatus = "rejected"
        state.registerError = action.payload
        state.latestPayload = null
        state.latestType = null
      });

    builder
      .addCase(addAdminsFetch.pending, (state, action) => {
        return { ...state, systemStatus: "pending" };
      })
      .addCase(addAdminsFetch.fulfilled, (state, action) => {
        return {
          ...state,
          allComptes: [action.payload, ...state.allComptes],
          systemStatus: "success",
        };
      }).
      addCase(addAdminsFetch.rejected, (state, action) => {
        return {
          ...state,
          systemStatus: "rejected",
          registerError: action.payload,
        };
      });
  }
})

export const { setIsDark } = systemSlice.actions
