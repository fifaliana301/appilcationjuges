import { createSlice } from '@reduxjs/toolkit'
import { initArticlesFetch, addArticlesFetch, deleteArticlesFetch, putArticlesFetch } from '../actions';

const datas = []

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    datas,
    articlesStatus: null,
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
    builder.addCase(initArticlesFetch.pending, (state, { payload }) => {
      return { ...state, articlesStatus: "pending" };
    });

    builder.addCase(initArticlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: action.payload,
        articlesStatus: "success",
      };
    });

    builder.addCase(initArticlesFetch.rejected, (state, action) => {
      return {
        ...state,
        articlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////ADD
    builder.addCase(addArticlesFetch.pending, (state, action) => {
      return { ...state, articlesStatus: "pending" };
    });

    builder.addCase(addArticlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: [...state.datas, action.payload],
        articlesStatus: "success",
      };
    });

    builder.addCase(addArticlesFetch.rejected, (state, action) => {
      return {
        ...state,
        articlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////DELETE
    builder.addCase(deleteArticlesFetch.pending, (state, action) => {
      return { ...state, articlesStatus: "pending" };
    });

    builder.addCase(deleteArticlesFetch.fulfilled, (state, action: any) => {
      return {
        ...state,
        datas: state.datas.filter(st => st.id !== action.payload.id),
        articlesStatus: "success",
      };
    });

    builder.addCase(deleteArticlesFetch.rejected, (state, action) => {
      return {
        ...state,
        articlesStatus: "rejected",
        registerError: action.payload,
      };
    });

    //////PUT
    builder.addCase(putArticlesFetch.pending, (state, action) => {
      return { ...state, articlesStatus: "pending" };
    });

    builder.addCase(putArticlesFetch.fulfilled, (state, action) => {
      return {
        ...state,
        datas: state.datas.filter(st => st.id === action.payload.id ? action.payload : state.datas),
        articlesStatus: "success",
      };
    });

    builder.addCase(putArticlesFetch.rejected, (state, action) => {
      return {
        ...state,
        articlesStatus: "rejected",
        registerError: action.payload,
      };
    });
  }
})
