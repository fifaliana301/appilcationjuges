import { createSlice } from '@reduxjs/toolkit'
import { initTablesFetch, addTablesFetch, deleteTablesFetch, putTablesFetch, changeLatestTableFetch } from '../actions';

// Tables for  one calendars battles 
const datas = [];

export const tablesSlice = createSlice({
  name: "tables",
  initialState: {
    datas,
    latestAction: null,
    tablesStatus: null,
    registerError: null,
    latestPayload: null,
    latestType: null,
  },
  reducers: {
    calendarsBattles: (state, action) => {
      state.datas = state.datas.map(datas => {
        if (datas.id === action.payload.tables.id) {
          datas.calendarsBattles.unshift(action.payload.tables)
        }
        return datas
      })
    }
  },
  extraReducers: (builder) => {
    //////INIT
    builder.addCase(initTablesFetch.pending, (state, { payload }) => {
      state.tablesStatus = "pending"
      state.latestPayload = null
      state.latestType = null
    });

    builder.addCase(initTablesFetch.fulfilled, (state, action) => {
      // console.log("addTablesFetch.fulfilled: ", action.payload)
      state.datas = action.payload
      state.tablesStatus = "success"
      state.latestPayload = action.payload
      state.latestType = action.type
    });

    builder.addCase(initTablesFetch.rejected, (state, action) => {
      state.tablesStatus = "rejected"
      state.registerError = action.payload
      state.latestPayload = null
      state.latestType = null
    });

    //////ADD
    builder.addCase(addTablesFetch.pending, (state, _) => {
      return {
        ...state,
        TablesStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(addTablesFetch.fulfilled, (state, action) => {
      // console.log("addTablesFetch.fulfilled: ", action.payload)

      state.latestAction = action.payload
      state.datas = [action.payload, ...state.datas]
      state.tablesStatus = "success"
      state.latestType = action.type
      state.latestPayload = action.payload
    });

    builder.addCase(addTablesFetch.rejected, (state, action) => {
      return {
        ...state,
        tablesStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////CHANGE LATEST ACTION
    builder.addCase(changeLatestTableFetch.pending, (state, _) => {
      return {
        ...state,
        tablesStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(changeLatestTableFetch.fulfilled, (state, action) => {
      return {
        ...state,
        latestAction: action.payload,
        tablesStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(changeLatestTableFetch.rejected, (state, action) => {
      return {
        ...state,
        tablesStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////DELETE
    builder.addCase(deleteTablesFetch.pending, (state, _) => {
      return {
        ...state,
        tablesStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(deleteTablesFetch.fulfilled, (state, action) => {
      const newState = {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        tablesStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      }
      if (state.latestAction.id === action.payload.id && newState.datas.length) {
        newState.latestAction = newState.datas[0]
      }
      return newState;
    });

    builder.addCase(deleteTablesFetch.rejected, (state, action) => {
      return {
        ...state,
        tablesStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////PUT
    builder.addCase(putTablesFetch.pending, (state, _) => {
      return {
        ...state,
        tablesStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(putTablesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : st),
        tablesStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(putTablesFetch.rejected, (state, action) => {
      return {
        ...state,
        tablesStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

  }
})
