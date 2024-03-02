import { createSlice } from '@reduxjs/toolkit'
import { initInvitedJudgesFetch, addInvitedJudgesFetch, deleteInvitedJudgesFetch, putInvitedJudgesFetch } from '../actions';

// invitedJudges for  one calendars battles 
const datas = [];

export const invitedJudgesSlice = createSlice({
  name: "invitedJudges",
  initialState: {
    datas,
    latestAction: null,
    invitedJudgesStatus: null,
    registerError: null,
    latestPayload: null,
    latestType: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //////INIT
    builder
      .addCase(initInvitedJudgesFetch.pending, (state, { payload }) => {
        state.invitedJudgesStatus = "pending"
        state.latestPayload = null
        state.latestType = null
      })
      .addCase(initInvitedJudgesFetch.fulfilled, (state, action) => {
        // console.log("initInvitedJudgesFetch.fulfilled: ", action.payload)
        state.datas = action.payload
        state.invitedJudgesStatus = "success"
        state.latestPayload = action.payload
        state.latestType = action.type
      })
      .addCase(initInvitedJudgesFetch.rejected, (state, action) => {
        state.invitedJudgesStatus = "rejected"
        state.registerError = action.payload
        state.latestPayload = null
        state.latestType = null
      });

    //////ADD
    builder
      .addCase(addInvitedJudgesFetch.pending, (state, _) => {
        return {
          ...state,
          invitedJudgesStatus: "pending",
          latestPayload: null,
          latestType: null,
        };
      })
      .addCase(addInvitedJudgesFetch.fulfilled, (state, action) => {
        // console.log("addinvitedJudgesFetch.fulfilled: ", action.payload)
        state.latestAction = action.payload
        state.datas = [action.payload, ...state.datas]
        state.invitedJudgesStatus = "success"
        state.latestType = action.type
        state.latestPayload = action.payload
      })
      .addCase(addInvitedJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          invitedJudgesStatus: "rejected",
          registerError: action.payload,
          latestPayload: null,
          latestType: null,
        };
      });

    //////DELETE
    builder
      .addCase(deleteInvitedJudgesFetch.pending, (state, _) => {
        return {
          ...state,
          invitedJudgesStatus: "pending",
          latestPayload: null,
          latestType: null,
        };
      })
      .addCase(deleteInvitedJudgesFetch.fulfilled, (state, action) => {
        const newState = {
          ...state,
          datas: state.datas.filter(st => st.id !== action.payload.id),
          invitedJudgesStatus: "success",
          latestPayload: action.payload,
          latestType: action.type,
        }
        if (state.latestAction.id === action.payload.id && newState.datas.length) {
          newState.latestAction = newState.datas[0]
        }
        return newState;
      })
      .addCase(deleteInvitedJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          invitedJudgesStatus: "rejected",
          registerError: action.payload,
          latestPayload: null,
          latestType: null,
        };
      });

    //////PUT
    builder
      .addCase(putInvitedJudgesFetch.pending, (state, _) => {
        return {
          ...state,
          invitedJudgesStatus: "pending",
          latestPayload: null,
          latestType: null,
        };
      })
      .addCase(putInvitedJudgesFetch.fulfilled, (state, action) => {
        return {
          ...state,
          datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
          invitedJudgesStatus: "success",
          latestPayload: action.payload,
          latestType: action.type,
        };
      })
      .addCase(putInvitedJudgesFetch.rejected, (state, action) => {
        return {
          ...state,
          invitedJudgesStatus: "rejected",
          registerError: action.payload,
          latestPayload: null,
          latestType: null,
        };
      });
  }
})
