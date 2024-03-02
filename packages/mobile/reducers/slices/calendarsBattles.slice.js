import { createSlice } from '@reduxjs/toolkit'
import {
  initCalendarsBattlesFetch,
  addCalendarsBattlesFetch,
  deleteCalendarsBattlesFetch,
  putCalendarsBattlesFetch,
  changeCalendarsBattlesActive,
  deleteRoundsCalendarsBattlesFetch,
  addRoundsCalendarsBattlesFetch,
} from '../actions';

const datas = [
  // {
  //   id: '1',
  //   dates: new Date().toString(),
  //   description: 'un',
  //   competitors: [
  //     {
  //       id: '1',
  //       photos: 'http://example.com',
  //       name: 'Denny'
  //     },
  //     {
  //       id: '2',
  //       photos: 'http://example.com',
  //       name: 'Max-R'
  //     },
  //   ],
  //   rounds: [
  //     {
  //       id: "1",
  //       name: "round1",
  //       start_time: new Date().toString(),
  //       end_time: new Date().toString(),
  //     },
  //     {
  //       id: "2",
  //       name: "round2",
  //       start_time: new Date().toString(),
  //       end_time: new Date().toString(),
  //     }
  //   ]
  // },
  // {
  //   id: '2',
  //   dates: new Date().toString(),
  //   description: 'deux',
  //   competitors: [
  //     {
  //       id: '1',
  //       photos: 'http://example.com',
  //       name: 'Denny'
  //     },
  //     {
  //       id: '2',
  //       photos: 'http://example.com',
  //       name: 'Max-R'
  //     },
  //   ],
  //   rounds: [
  //     {
  //       id: "1",
  //       name: "round1",
  //       start_time: new Date().toString(),
  //       end_time: new Date().toString(),
  //     },
  //   ]
  // }
]

export const calendarsBattlesSlice = createSlice({
  name: "calendarsBattles",
  initialState: {
    datas,
    calendarsBattlesActive: null,
    calendarsBattlesStatus: null,
    registerError: null,
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
        datas: [...state.datas, action.payload]
      })
    },
    changeCalendarsBattlesActive: (state, action) => {
      return ({
        ...state,
        calendarsBattlesActive: action.payload
      })
    },
    delete: (state, action) => {
      return ({
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id)
      })
    },

    addRound: (state, action) => {
      return ({
        ...state,
        latestAction: action.payload,
        datas: state.datas.filter(st => {
          if (st.id === action.payload.calendarsBattles.id) {
            st.actions = [...st.actions, action.payload]
            return st
          }
          return st
        })
      })
    },
    deleteRound: (state, action) => {
      return ({
        ...state,
        datas: state.datas.filter(st => {
          if (st.id === action.payload.calendarsBattles.id) {
            st.rounds = st.rounds.filter(ac => ac.id !== action.payload.id)
            return st
          }
          return st
        })
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
    builder.addCase(initCalendarsBattlesFetch.pending, (state, { payload }) => {
      return { ...state, calendarsBattlesStatus: "pending" };
    });

    builder.addCase(initCalendarsBattlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: action.payload,
        calendarsBattlesStatus: "success",
      };
    });

    builder.addCase(initCalendarsBattlesFetch.rejected, (state, action) => {
      return {
        ...state,
        calendarsBattlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////ADD
    builder.addCase(addCalendarsBattlesFetch.pending, (state, action) => {
      return { ...state, calendarsBattlesStatus: "pending" };
    });

    builder.addCase(addCalendarsBattlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: [...state.datas, action.payload],
        calendarsBattlesStatus: "success",
      };
    });

    builder.addCase(addCalendarsBattlesFetch.rejected, (state, action) => {
      return {
        ...state,
        calendarsBattlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    ////// CHANGE BATTLE ACTIVE
    builder.addCase(changeCalendarsBattlesActive.pending, (state, action) => {
      return { ...state, calendarsBattlesStatus: "pending" };
    });

    builder.addCase(changeCalendarsBattlesActive.fulfilled, (state, action) => {
      return {
        ...state,
        calendarsBattlesActive: action.payload,
        calendarsBattlesStatus: "success",
      };
    });

    builder.addCase(changeCalendarsBattlesActive.rejected, (state, action) => {
      return {
        ...state,
        calendarsBattlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////DELETE
    builder.addCase(deleteCalendarsBattlesFetch.pending, (state, action) => {
      return { ...state, calendarsBattlesStatus: "pending" };
    });

    builder.addCase(deleteCalendarsBattlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        calendarsBattlesStatus: "success",
      };
    });

    builder.addCase(deleteCalendarsBattlesFetch.rejected, (state, action) => {
      return {
        ...state,
        calendarsBattlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////PUT
    builder.addCase(putCalendarsBattlesFetch.pending, (state, action) => {
      return { ...state, calendarsBattlesStatus: "pending" };
    });

    builder.addCase(putCalendarsBattlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
        calendarsBattlesStatus: "success",
      };
    });

    builder.addCase(putCalendarsBattlesFetch.rejected, (state, action) => {
      return {
        ...state,
        calendarsBattlesStatus: "rejected",
        registerError: action.payload,
      };
    });


    //////ADD ROUND
    builder.addCase(addRoundsCalendarsBattlesFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(addRoundsCalendarsBattlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => {
          if (st.id === action.payload.calendarsBattles.id) {
            return {
              ...st,
              rounds: [...st.rounds, action.payload]
            }
          }
          return st
        }),
        roundsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      };
    });

    builder.addCase(addRoundsCalendarsBattlesFetch.rejected, (state, action) => {
      return {
        ...state,
        roundsStatus: "rejected",
        registerError: action.payload,
        latestPayload: null,
        latestType: null,
      };
    });

    //////DELETE ROUND
    builder.addCase(deleteRoundsCalendarsBattlesFetch.pending, (state, action) => {
      return {
        ...state,
        roundsStatus: "pending",
        latestPayload: null,
        latestType: null,
      };
    });

    builder.addCase(deleteRoundsCalendarsBattlesFetch.fulfilled, (state, action) => {
      return ({
        ...state,
        datas: state.datas.map(st => {
          if (st.id === action.payload.calendarsBattles.id) {
            return {
              ...st,
              rounds: st.rounds.filter(ac => ac.id !== action.payload.id)
            }
          }
          return st
        }),
        roundsStatus: "success",
        latestPayload: action.payload,
        latestType: action.type,
      });
    });

    builder.addCase(deleteRoundsCalendarsBattlesFetch.rejected, (state, action) => {
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
