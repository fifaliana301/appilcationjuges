import { fetchInvitedJudgesCompetitions, postInvitedJudges } from "@/libs/utils/invitedJudges";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import Swal from "sweetalert2";
// import { setMessage } from "./message";

// const backendURL = "http://localhost:9000";

export const initInvitedJudgesFetch = createAsyncThunk(
  "invitedJudges/init",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await fetchInvitedJudgesCompetitions({ id: datas.id }, config);
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

export const addInvitedJudgesFetch = createAsyncThunk(
  "InvitedJudges/add",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await postInvitedJudges(datas, config);
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


export const deleteInvitedJudgesFetch = createAsyncThunk(
  "invitedJudges/delete",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.delete(`/InvitedJudges/${datas.id}`, config);
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


export const putInvitedJudgesFetch = createAsyncThunk(
  "invitedJudges/put",
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

