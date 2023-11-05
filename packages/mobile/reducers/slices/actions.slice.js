import { createSlice } from '@reduxjs/toolkit'
import { initActionsFetch, addActionsFetch, deleteActionsFetch, putActionsFetch, changeLatestActionFetch } from '../actions';

// actions for  one calendars battles 
const datas = [
  {
    id: '1',

    execution: 0,
    form: 0,
    confidence: 0,
    spontaneity: 0,

    technique: 0.1,
    variete: 0,
    performativity: 0,
    musicality: 0,
    creativity: 0,
    personality: 0,

    repeat: 0,
    beat: 0,

    crash: 0,
    misbehavior: 0,
    latestAction: 'technique',
    round: {
      id: "1",
      name: "round1",
      start_time: new Date().toString(),
      end_time: new Date().toString(),
    },

    competitor: {
      id: '2',
      photos: 'http://example.com',
      name: 'Max-R'
    },
  }
]

export const actionsSlice = createSlice({
  name: "actions",
  initialState: {
    datas,
    latestAction: null,
    actionsStatus: null,
    registerError: null,
    latestPayload: null,
    latestType: null,
  },
  reducers: {
    init: (state, action) => {
      return ({
        ...state,
        datas: [...action.payload]
      })
    },
    add: (state, action) => {
      return ({
        ...state,
        latestAction: action.payload,
        datas: [action.payload, ...state.datas]
      })
    },
    delete: (state, action) => {
      return ({
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id)
      })
    },
    changeLatestAction: (state, action) => {
      return ({
        ...state,
        latestAction: action.payload,
      })
    },
    put: (state, action) => {
      return ({
        ...state,
        datas: state.datas.filter(st => st.id === action.payload.id ? action.payload : state.datas)
      })
    }
  },
  extraReducers: (builder) => {
    //////INIT
    builder.addCase(initActionsFetch.pending, (state, { payload }) => {
      return {
        ...state,
        actionsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(initActionsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: action.payload,
        actionsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(initActionsFetch.rejected, (state, action) => {
      return {
        ...state,
        actionsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////ADD
    builder.addCase(addActionsFetch.pending, (state, action) => {
      return {
        ...state,
        actionsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(addActionsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        latestAction: action.payload,
        datas: [action.payload, ...state.datas],
        actionsStatus: "success",
        latestType: action.type,
        latestPayload: action.payload,
      };
    });

    builder.addCase(addActionsFetch.rejected, (state, action) => {
      return {
        ...state,
        actionsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////CHANGE LATEST ACTION
    builder.addCase(changeLatestActionFetch.pending, (state, action) => {
      return {
        ...state,
        actionsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(changeLatestActionFetch.fulfilled, (state, action) => {
      return {
        ...state,
        latestAction: action.payload,
        actionsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(changeLatestActionFetch.rejected, (state, action) => {
      return {
        ...state,
        actionsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////DELETE
    builder.addCase(deleteActionsFetch.pending, (state, action) => {
      return {
        ...state,
        actionsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(deleteActionsFetch.fulfilled, (state, action: any) => {
      const newState = {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        actionsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      }
      if (state.latestAction.id === action.payload.id && newState.datas.length) {
        newState.latestAction = newState.datas[0]
      }
      return newState;
    });

    builder.addCase(deleteActionsFetch.rejected, (state, action) => {
      return {
        ...state,
        actionsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////PUT
    builder.addCase(putActionsFetch.pending, (state, action) => {
      return {
        ...state,
        actionsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(putActionsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
        actionsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(putActionsFetch.rejected, (state, action) => {
      return {
        ...state,
        actionsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });
  }
})
