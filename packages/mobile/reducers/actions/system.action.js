import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { setMessage } from "./message";

// const backendURL = "http://localhost:9000";

export const setIsDarkFetch = createAsyncThunk(
  "system/setIsDark",
  async (datas, thunkAPI) => {
    return datas
  }
);
