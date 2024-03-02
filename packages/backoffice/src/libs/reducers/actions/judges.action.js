import { createAsyncThunk } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
// import { setMessage } from "./message";

import { postLogin, fetchJudges, postSign, fetchJudgesActive, patchJudges } from "@/libs/utils/judges";
import { patchCompetitor, postCompetitor } from "@/libs/utils/competitors";
import { postPhotos } from '@/libs/utils/photos';

export const createAdminActiveFetch = createAsyncThunk(
  "judges/createAdminActive",
  async ({ datas, type }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let data;
      if (type === 'judges') {
        data = await postSign(datas, config);
      } else {
        data = await postCompetitor(datas, config);
      }
      // console.log(data.user)
      // if (data.user?.admins?.id) {
      //   localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
      //   console.log("login", data)
      //   localStorage.setItem('admin', data.user.admins.id);
      // }
      // console.log("changeAdminActiveFetch", data);
      return data
    } catch (error) {
      console.log(error?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const patchtAdminActiveFetch = createAsyncThunk(
  "judges/patchtAdminActive",
  async ({ id, datas, image, type }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const configFormData = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (image) {
        console.log("post image")
        const responseImage = await postPhotos(image, configFormData);
        console.log({responseImage})
      }

      let data;
      if (type === 'judges') {
        data = await patchJudges(id, datas, config);
      } else {
        data = await patchCompetitor(id, datas, config);
      }

      // console.log(data.user)
      // if (data.user?.admins?.id) {
      //   localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
      //   console.log("login", data)
      //   localStorage.setItem('admin', data.user.admins.id);
      // }
      // console.log("changeAdminActiveFetch", data);
      return data
    } catch (error) {
      console.log("Error ", error?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);


export const changeAdminActiveFetch = createAsyncThunk(
  "judges/changeAdminActive",
  async (datas, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await postLogin(datas, config);
      if (data.user) {
        localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      // console.log("changeAdminActiveFetch", data);
      return data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const initJudgesActiveFetch = createAsyncThunk(
  "judges/initActive",
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

        const data = await fetchJudgesActive(config);
        // const response = { data: datas };
        // thunkAPI.dispatch(setMessage(response.data.message));
        return data; //////
      }
      return null;
    } catch (error) {
      console.log({ error })
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


export const initJudgesFetch = createAsyncThunk(
  "judges/init",
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

        const data = await fetchJudges(config);
        // const response = { data: datas };
        // thunkAPI.dispatch(setMessage(response.data.message));
        return data; //////
      }
      return null;
    } catch (error) {
      console.log({ error })
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

export const addJudgesFetch = createAsyncThunk(
  "judges/add",
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


export const deleteJudgesFetch = createAsyncThunk(
  "judges/delete",
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


export const putJudgesFetch = createAsyncThunk(
  "judges/put",
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

