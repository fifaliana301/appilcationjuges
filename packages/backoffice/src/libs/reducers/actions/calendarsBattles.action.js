import { createAsyncThunk } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
// import { setMessage } from "./message";

// const backendURL = "http://localhost:9000";
import { postCalendarsBattles, fetchCalendarsBattlesOne, fetchCalendarsBattles } from "@/libs/utils/calendarsBattles";

export const initCalendarsBattlesFetch = createAsyncThunk(
  "calendarsBattles/init",
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

        const data = await fetchCalendarsBattles(config);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return data; //////
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

export const changeRullingActiveFetch = createAsyncThunk(
  "calendarsBattles/changeRullingActive",
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

        const data = await fetchCalendarsBattlesOne(datas, config);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return data?.length ? data[0] : null; //////
      }
      return null;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const addCalendarsBattlesFetch = createAsyncThunk(
  "calendarsBattles/add",
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

        const data = await postCalendarsBattles(datas, config);
        thunkAPI.dispatch({ type: "tables/calendarsBattles", payload: data });
        return data; //////
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

export const changeCalendarsBattlesActive = createAsyncThunk(
  "calendarsBattles/changeCalendarsBattlesActive",
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


export const deleteCalendarsBattlesFetch = createAsyncThunk(
  "calendarsBattles/delete",
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


export const putCalendarsBattlesFetch = createAsyncThunk(
  "calendarsBattles/put",
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

export const addRoundsCalendarsBattlesFetch = createAsyncThunk(
  "rounds/addRound",
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


export const deleteRoundsCalendarsBattlesFetch = createAsyncThunk(
  "rounds/deleteRound",
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


