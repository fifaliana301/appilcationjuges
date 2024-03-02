import { createSlice } from '@reduxjs/toolkit'
import { 
  initCompetitorsFetch, 
  addCompetitorsFetch, 
  deleteCompetitorsFetch, 
  putCompetitorsFetch, 
  changeCompetitorsActiveFetch
} from '../actions';

const datas = []

export const competitorsSlice = createSlice({
  name: "competitors",
  initialState: {
    datas,
    competitorsActive: null,
    competitorsStatus: null,
    registerError: null,
  },
  reducers: {
    changeCompetitorsActive: (state, action) => {
      state.competitorsActive = action.payload
    },
  },
  extraReducers: (builder) => {
    //////INIT
    builder.addCase(initCompetitorsFetch.pending, (state, { payload }) => {
      return { ...state, competitorsStatus: "pending" };
    });

    builder.addCase(initCompetitorsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: action.payload,
        competitorsStatus: "success",
      };
    });

    builder.addCase(initCompetitorsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitorsStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////ADD
    builder.addCase(addCompetitorsFetch.pending, (state, action) => {
      return { ...state, competitorsStatus: "pending" };
    });

    builder.addCase(addCompetitorsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: [...state.datas, action.payload],
        competitorsStatus: "success",
      };
    });

    builder.addCase(addCompetitorsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitorsStatus: "rejected",
        registerError: action.payload,
      };
    });



    // ////// CHANGE COMPETITOR ACTIVE
    // builder.addCase(changeCompetitorsActiveFetch.pending, (state, action) => {
    //   return { ...state, competitorsStatus: "pending" };
    // });
    //
    // builder.addCase(changeCompetitorsActiveFetch.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     competitorsActive: action.payload,
    //     competitorsStatus: "success",
    //   };
    // });
    //
    // builder.addCase(changeCompetitorsActiveFetch.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     competitorsStatus: "rejected",
    //     registerError: action.payload,
    //   };
    // });



    //////DELETE
    builder.addCase(deleteCompetitorsFetch.pending, (state, action) => {
      return { ...state, competitorsStatus: "pending" };
    });

    builder.addCase(deleteCompetitorsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        competitorsStatus: "success",
      };
    });

    builder.addCase(deleteCompetitorsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitorsStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////PUT
    builder.addCase(putCompetitorsFetch.pending, (state, action) => {
      return { ...state, competitorsStatus: "pending" };
    });

    builder.addCase(putCompetitorsFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
        competitorsStatus: "success",
      };
    });

    builder.addCase(putCompetitorsFetch.rejected, (state, action) => {
      return {
        ...state,
        competitorsStatus: "rejected",
        registerError: action.payload,
      };
    });
  }
})

export const { changeCompetitorsActive } = competitorsSlice.actions
