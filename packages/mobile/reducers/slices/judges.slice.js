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
    changeJudgesActive: (state, action) => {
      return ({
        ...state,
        judgesActive: action.payload
      })
    },
    delete: (state, action) => {
      return ({
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id)
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
    builder.addCase(initJudgesFetch.pending, (state, { payload }) => {
      return { ...state, judgesStatus: "pending" };
    });

    builder.addCase(initJudgesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: action.payload,
        judgesStatus: "success",
      };
    });

    builder.addCase(initJudgesFetch.rejected, (state, action) => {
      return {
        ...state,
        judgesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////ADD
    builder.addCase(addJudgesFetch.pending, (state, action) => {
      return { ...state, judgesStatus: "pending" };
    });

    builder.addCase(addJudgesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: [...state.datas, action.payload],
        judgesStatus: "success",
      };
    });

    builder.addCase(addJudgesFetch.rejected, (state, action) => {
      return {
        ...state,
        judgesStatus: "rejected",
        registerError: action.payload,
      };
    });

    ////// CHANGE JUDGE ACTIVE
    builder.addCase(changeJudgesActiveFetch.pending, (state, action) => {
      return { ...state, judgesStatus: "pending" };
    });

    builder.addCase(changeJudgesActiveFetch.fulfilled, (state, action) => {
      return {
        ...state,
        // judgesActive: action.payload,
        judgesActive: state.datas,
        judgesStatus: "success",
      };
    });

    builder.addCase(changeJudgesActiveFetch.rejected, (state, action) => {
      return {
        ...state,
        judgesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////DELETE
    builder.addCase(deleteJudgesFetch.pending, (state, action) => {
      return { ...state, judgesStatus: "pending" };
    });

    builder.addCase(deleteJudgesFetch.fulfilled, (state, action: any) => {
      return {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        judgesStatus: "success",
      };
    });

    builder.addCase(deleteJudgesFetch.rejected, (state, action) => {
      return {
        ...state,
        judgesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////PUT
    builder.addCase(putJudgesFetch.pending, (state, action) => {
      return { ...state, judgesStatus: "pending" };
    });

    builder.addCase(putJudgesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.map(st => st.id === action.payload.id ? action.payload : state.datas),
        judgesStatus: "success",
      };
    });

    builder.addCase(putJudgesFetch.rejected, (state, action) => {
      return {
        ...state,
        judgesStatus: "rejected",
        registerError: action.payload,
      };
    });
  }
})
