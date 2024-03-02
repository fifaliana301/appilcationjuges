import { createSlice } from '@reduxjs/toolkit'
import {
  initJudgesFetch,
  addJudgesFetch,
  deleteJudgesFetch,
  putJudgesFetch,
  changeJudgesActiveFetch
} from '../actions';

const datas = []

export const judgesSlice = createSlice({
  name: "judges",
  initialState: {
    datas,
    judgesActive: null,
    judgesStatus: null,
    registerError: null,
    accessToken: null,
  },
  reducers: {
    resetError: (state, payload) => {
      state.judgesStatus = null
      state.registerError = null
    }
  },
  extraReducers: (builder) => {
    builder

      ////// CHANGE JUDGE ACTIVE
      .addCase(changeJudgesActiveFetch.pending, (state, _) => {
        state.judgesStatus = "pending";
      })

      .addCase(changeJudgesActiveFetch.fulfilled, (state, { payload }) => {
        const { judge, accessToken } = payload
        state.judgesStatus = "success"
        state.judgesActive = judge
        state.accessToken = accessToken
      })

      .addCase(changeJudgesActiveFetch.rejected, (state, action) => {
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

export const { resetError } = judgesSlice.actions
