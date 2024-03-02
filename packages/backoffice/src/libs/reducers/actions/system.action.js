import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllComptes, postAddAdmins } from "@/libs/utils/system";


export const setIsDarkFetch = createAsyncThunk(
  "system/setIsDark",
  async (datas, thunkAPI) => {
    return datas
  }
);




export const getAllComptes = createAsyncThunk(
  "competitions/allComptes",
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

        const response = await fetchAllComptes(config);
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


export const addAdminsFetch = createAsyncThunk(
  "admins/add",
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

        const response = await postAddAdmins(datas, config);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response; //////
      }
      return null;
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

