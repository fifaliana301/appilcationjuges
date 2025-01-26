import { createAsyncThunk } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
// import { setMessage } from "./message";

import {
  getCompetition,
  postCompetition,
  deleteCompetition,
  patchCompetition,
  patchAddCompetitorsToCompetitions,
} from "@/libs/utils/competitions";

export const addCompetitorsToCompetitions = createAsyncThunk(
  "competitions/addCompetitors",
  async (datas, thunkAPI) => {
    try {
      const value = localStorage.getItem('accessToken');
      if (value !== null) {

        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(value)}`
          },
        };

        const response = await patchAddCompetitorsToCompetitions(datas, config);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response; //////
      }
      return null;
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const initCompetitionsFetch = createAsyncThunk(
  "competitions/init",
  async (datas, thunkAPI) => {
    try {
      const value = localStorage.getItem('accessToken');
      if (value !== null) {

        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(value)}`
          },
        };

        const response = await getCompetition(config);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response; //////
      }
      return null;
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addCompetitionsFetch = createAsyncThunk(
  "competitions/add",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await postCompetition(datas, config);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return response; //////
    } catch (error) {
      console.log(error)
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeCompetitionsActiveFetch = createAsyncThunk(
  "competitions/changeCompetitionsActive",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = { data: datas };
      // thunkAPI.dispatch(setMessage(response.data.message));
      return response?.data; //////
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const deleteCompetitionsFetch = createAsyncThunk(
  "competitions/delete",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await deleteCompetition(datas, config);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return response; //////
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const putCompetitionsFetch = createAsyncThunk(
  "competitions/put",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await patchCompetition(datas.id, datas, config);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return data; //////
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

