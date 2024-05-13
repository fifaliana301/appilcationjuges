import { createSlice } from '@reduxjs/toolkit'
import {
  initJudgesFetch,
  addJudgesFetch,
  deleteJudgesFetch,
  putJudgesFetch,
  changeAdminActiveFetch,
  createAdminActiveFetch,
  patchtAdminActiveFetch,
  initJudgesActiveFetch,
  validateAdminActiveFetch,
} from '../actions';

const datas = []

export const judgesSlice = createSlice({
  name: "judges",
  initialState: {
    datas,
    adminActive: null,
    judgesStatus: null,
    registerError: null,
    accessToken: null,
  },
  reducers: {
    resetError: (state, payload) => {
      state.judgesStatus = null
      state.registerError = null
    },
    resetState: (state, payload) => {
      state.datas = datas;
      state.judgesStatus = null;
      state.registerError = null;
      state.adminActive = null;
      state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      ////// VALIDE ADMIN ACTIVE
      .addCase(validateAdminActiveFetch.pending, (state, _) => {
        state.judgesStatus = "pending";
      })

      .addCase(validateAdminActiveFetch.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload
        console.log("changeAdminActiveFetch.fulfilled")
        state.judgesStatus = "success"
        state.adminActive = user 
        state.accessToken = accessToken
      })

      .addCase(validateAdminActiveFetch.rejected, (state, action) => {
        state.judgesStatus = "rejected";
        state.registerError = action.payload;
      })

      ////// CHANGE ADMIN ACTIVE
      .addCase(changeAdminActiveFetch.pending, (state, _) => {
        state.judgesStatus = "pending";
      })

      .addCase(changeAdminActiveFetch.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload
        console.log("changeAdminActiveFetch.fulfilled")
        state.judgesStatus = "success"
        state.adminActive = user 
        state.accessToken = accessToken
      })

      .addCase(changeAdminActiveFetch.rejected, (state, action) => {
        state.judgesStatus = "rejected";
        state.registerError = action.payload;
      })

      ////// PUT ADMIN ACTIVE
      .addCase(patchtAdminActiveFetch.pending, (state, _) => {
        state.judgesStatus = "pending";
      })

      .addCase(patchtAdminActiveFetch.fulfilled, (state, { payload }) => {
        console.log("changeAdminActiveFetch.fulfilled")
        state.judgesStatus = "success"
        state.adminActive =  payload
      })

      .addCase(patchtAdminActiveFetch.rejected, (state, action) => {
        state.judgesStatus = "rejected";
        state.registerError = action.payload;
      })

      ////// CREATE USER ACTIVE
      .addCase(createAdminActiveFetch.pending, (state, _) => {
        state.judgesStatus = "pending";
      })

      .addCase(createAdminActiveFetch.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload
        console.log("createAdminActiveFetch.fulfilled")
        state.judgesStatus = "success"
        state.adminActive = user 
        state.accessToken = accessToken
      })

      .addCase(createAdminActiveFetch.rejected, (state, action) => {
        state.judgesStatus = "rejected";
        state.registerError = action.payload;
      })

      //////INIT
      .addCase(initJudgesFetch.pending, (state, _) => {
        return { ...state, judgesStatus: "pending" };
      })

      .addCase(initJudgesFetch.fulfilled, (state, action) => {
        return {
          ...state,
          datas: action.payload,
          judgesStatus: "success",
        };
      })

      .addCase(initJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          judgesStatus: "rejected",
          registerError: action.payload,
        };
      })

      //////INIT ACTIVE
      .addCase(initJudgesActiveFetch.pending, (state, _) => {
        return { ...state, judgesStatus: "pending" };
      })

      .addCase(initJudgesActiveFetch.fulfilled, (state, action) => {
        return {
          ...state,
          adminActive: action.payload,
          judgesStatus: "success",
        };
      })

      .addCase(initJudgesActiveFetch.rejected, (state, action) => {
        return {
          ...state,
          judgesStatus: "rejected",
          registerError: action.payload,
        };
      })

      //////ADD
      .addCase(addJudgesFetch.pending, (state, _) => {
        return { ...state, judgesStatus: "pending" };
      })

      .addCase(addJudgesFetch.fulfilled, (state, action) => {
        return {
          ...state,
          datas: [...state.datas, action.payload],
          judgesStatus: "success",
        };
      })

      .addCase(addJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          judgesStatus: "rejected",
          registerError: action.payload,
        };
      })

      //////DELETE
      .addCase(deleteJudgesFetch.pending, (state, _) => {
        return { ...state, judgesStatus: "pending" };
      })

      .addCase(deleteJudgesFetch.fulfilled, (state, action) => {
        return {
          ...state,
          datas: state.datas.filter(st => st.id !== action.payload.id),
          judgesStatus: "success",
        };
      })

      .addCase(deleteJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          judgesStatus: "rejected",
          registerError: action.payload,
        };
      })

      //////PUT
      .addCase(putJudgesFetch.pending, (state, _) => {
        return { ...state, judgesStatus: "pending" };
      })

      .addCase(putJudgesFetch.fulfilled, (state, action) => {
        return {
          ...state,
          datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
          judgesStatus: "success",
        };
      })

      .addCase(putJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          judgesStatus: "rejected",
          registerError: action.payload,
        };
      })
  }
})

export const { resetError, resetState } = judgesSlice.actions
