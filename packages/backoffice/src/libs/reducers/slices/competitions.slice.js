import { createSlice } from '@reduxjs/toolkit'
import {
  initCompetitionsFetch,
  addCompetitionsFetch,
  deleteCompetitionsFetch,
  putCompetitionsFetch,
  changeCompetitionsActiveFetch,
  addCompetitorsToCompetitions
} from '../actions';

// competions alt of now
const datas = [
  // {
  //   id: "1",
  //   name: "battle 2023",
  //   date: new Date().toString(),
  //   location: "fianarantsoa",
  //   rules: "",
  //   calendarsBattles: [
  //     {
  //       id: '1',
  //       date: new Date().toString(),
  //       description: 'un',
  //       competitors: [
  //         {
  //           id: '1',
  //           photos: 'http://example.com',
  //           name: 'Denny'
  //         },
  //         {
  //           id: '2',
  //           photos: 'http://example.com',
  //           name: 'Max-R'
  //         },
  //       ],
  //       rounds: [
  //         {
  //           id: "1",
  //           name: "round1",
  //           start_time: new Date().toString(),
  //           end_time: new Date().toString(),
  //         },
  //         {
  //           id: "2",
  //           name: "round2",
  //           start_time: new Date().toString(),
  //           end_time: new Date().toString(),
  //         }
  //       ]
  //     },
]

export const competitionsSlice = createSlice({
  name: "competitions",
  initialState: {
    datas,
    competitionsActive: null,
    competitionsStatus: null,
    registerError: null,
  },
  reducers: {
    init: (state, action) => {
      return ({
        ...state,
        datas: [...action.payload]
      })
    },
    changeCompetitionsActive: (state, action) => {
      return ({
        ...state,
        competitionsActive: action.payload
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
    //////ADD
    builder.addCase(addCompetitorsToCompetitions.pending, (state, action) => {
      return { ...state, competitionsStatus: "pending" };
    });

    builder.addCase(addCompetitorsToCompetitions.fulfilled, (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        // datas: [...state.datas, action.payload],
        competitionsStatus: "success",
      };
    });

    builder.addCase(addCompetitorsToCompetitions.rejected, (state, action) => {
      return {
        ...state,
        competitionsStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////INIT
    builder.addCase(initCompetitionsFetch.pending, (state, { payload }) => {
      return { ...state, competitionsStatus: "pending" };
    });

    builder.addCase(initCompetitionsFetch.fulfilled, (state, action) => {

      return {
        ...state,
        datas: action.payload,
        competitionsStatus: "success",
      };
    });

    builder.addCase(initCompetitionsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitionsStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////ADD
    builder.addCase(addCompetitionsFetch.pending, (state, action) => {
      return { ...state, competitionsStatus: "pending" };
    });

    builder.addCase(addCompetitionsFetch.fulfilled, (state, action) => {
      console.log(state.datas.filter(st => st.id !== action.payload.id), action.payload)
      return {
        ...state,
        datas: [...state.datas, action.payload],
        competitionsStatus: "success",
      };
    });

    builder.addCase(addCompetitionsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitionsStatus: "rejected",
        registerError: action.payload,
      };
    });

    ////// CHANGE COMPETITOR ACTIVE
    builder.addCase(changeCompetitionsActiveFetch.pending, (state, action) => {
      return { ...state, competitionsStatus: "pending" };
    });

    builder.addCase(changeCompetitionsActiveFetch.fulfilled, (state, action) => {
      return {
        ...state,
        competitionsActive: action.payload,
        competitionsStatus: "success",
      };
    });

    builder.addCase(changeCompetitionsActiveFetch.rejected, (state, action) => {
      return {
        ...state,
        competitionsStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////DELETE
    builder.addCase(deleteCompetitionsFetch.pending, (state, action) => {
      return { ...state, competitionsStatus: "pending" };
    });

    builder.addCase(deleteCompetitionsFetch.fulfilled, (state, action) => {
      console.log(state.datas.filter(st => st.id !== action.payload.id), action.payload)
      return {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        competitionsStatus: "success",
      };
    });

    builder.addCase(deleteCompetitionsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitionsStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////PUT
    builder.addCase(putCompetitionsFetch.pending, (state, action) => {
      state.competitionsStatus = "pending"
    });

    builder.addCase(putCompetitionsFetch.fulfilled, (state, action) => {
      console.log(action.payload, state.datas.map(st => st.id === action.payload.id ? action.payload : st))
      state.datas = state.datas.map(st => st.id === action.payload.id ? action.payload : st)
      state.competitionsStatus = "success"
    });

    builder.addCase(putCompetitionsFetch.rejected, (state, action) => {
      state.competitionsStatus = "rejected"
      state.registerError = action.payload;
    });
  }
})
