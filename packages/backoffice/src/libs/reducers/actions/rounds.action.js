import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRoundsCalendarsBattles, postRounds, postRoundsUpdateAll } from '@/libs/utils/rounds'
// import Swal from "sweetalert2";
// import { setMessage } from "./message";

// const backendURL = "http://localhost:9000";

export const initRoundsFetch = createAsyncThunk(
  "rounds/init",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await fetchRoundsCalendarsBattles(datas, config);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return data;
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

export const addRoundsFetch = createAsyncThunk(
  "rounds/add",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await postRounds(datas, config);
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


export const deleteRoundsFetch = createAsyncThunk(
  "rounds/delete",
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


export const putRoundsFetch = createAsyncThunk(
  "rounds/put",
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

export const addActionRoundsFetch = createAsyncThunk(
  "rounds/addAction",
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


export const deleteActionRoundsFetch = createAsyncThunk(
  "rounds/deleteAction",
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

export const updateRoundsUpdateAll = createAsyncThunk(
  "rounds/updateAll",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await postRoundsUpdateAll(datas, config);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return data;
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

