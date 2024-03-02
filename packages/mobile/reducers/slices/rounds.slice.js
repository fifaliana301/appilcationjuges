import { createSlice } from '@reduxjs/toolkit'
import {
  initRoundsFetch,
  addRoundsFetch,
  deleteRoundsFetch,
  putRoundsFetch,
  changeRoundsActiveFetch,
  addActionRoundsFetch,
  deleteActionRoundsFetch,
} from '../actions';

// rounds for  one calendars battles 
const datas = []

export const roundsSlice = createSlice({
  name: "rounds",
  initialState: {
    datas,
    roundsActive: null,
    roundsStatus: null,
    registerError: null,
    latestPayload: null,
    latestType: null,
    loadingRound: false,
  },
  // reducers: {
  //   changeRoundsActiveFetch: (state, action) => {
  //     return {
  //       ...state,
  //       roundsActive: action.payload,
  //       latestPayload: action.payload,
  //       latestType: action.type,
  //     };
  //   }
  // },
  extraReducers: (builder) => {
    //////INIT
    builder.addCase(initRoundsFetch.pending, (state, { payload }) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
        loadingRound: true,
      };
    });

    builder.addCase(initRoundsFetch.fulfilled, (state, action) => {
      state.datas = action.payload
      state.roundsStatus = "success"
      state.latestPayload = action.payload
      state.latestType = action.type
      state.loadingRound = false
    });

    builder.addCase(initRoundsFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
        loadingRound: false,
      };
    });

    ////// CHANGE ACTIVE
    builder.addCase(changeRoundsActiveFetch.pending, (state, { payload }) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
        loadingRound: true,
      };
    });

    builder.addCase(changeRoundsActiveFetch.fulfilled, (state, action) => {
      const newDatas = state.datas.map(st => st.id === action.payload.id ? action.payload : st)
      if (JSON.stringify(newDatas) === JSON.stringify(state.datas)) {
        return {
          ...state,
          roundsActive: action.payload,
          latestPayload: action.payload,
          latestType: action.type,
          loadingRound: false,
        }
      }
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : st),
        roundsActive: action.payload,
        latestPayload: action.payload,
        latestType: action.type,
        loadingRound: false,
      }
    });

    builder.addCase(changeRoundsActiveFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
        loadingRound: false,
      };
    });

    //////ADD
    builder.addCase(addRoundsFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(addRoundsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: [...state.datas, action.payload],
        roundsStatus: "success",
        roundsActive: action.payload,
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(addRoundsFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////DELETE
    builder.addCase(deleteRoundsFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(deleteRoundsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        roundsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(deleteRoundsFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    // //////CHANGE ACTIVE ROUNDS
    // builder.addCase(changeRoundsActiveFetch.pending, (state, action) => {
    //   return {
    //     ...state,
    //     roundsStatus: "pending",
    //     latestPayload: null,
    //     latestType: null,
    //   };
    // });
    //
    // builder.addCase(changeRoundsActiveFetch.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     datas: [...state.datas, action.payload],
    //     roundsStatus: "success",
    //     latestPayload: action.payload,
    //     latestType: action.type,
    //   };
    // });
    //
    // builder.addCase(changeRoundsActiveFetch.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     roundsStatus: "rejected",
    //     registerError: action.payload,
    //     latestPayload: null,
    //     latestType: null,
    //   };
    // });

    //////PUT
    builder.addCase(putRoundsFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(putRoundsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
        roundsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(putRoundsFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });


    //////ADD ACTION
    builder.addCase(addActionRoundsFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(addActionRoundsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => {
          if (st.id === action.payload?.rounds?.id) {
            return {
              ...st,
              actions: [...st.actions, action.payload]
            }
          }
          return st
        }),
        roundsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(addActionRoundsFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////DELETE ACTION
    builder.addCase(deleteActionRoundsFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(deleteActionRoundsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.filter(st => {
          if (st.id === action.payload?.rounds?.id) {
            return {
              ...st,
              actions: st.actions.filter(ac => ac.id !== action.payload.id)
            }
          }
          return st
        }),
        roundsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(deleteActionRoundsFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });
  }
})

// export const { changeRoundsActiveFetch } = roundsSlice.actions
