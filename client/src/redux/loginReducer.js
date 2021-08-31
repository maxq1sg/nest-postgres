import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

const initialState = {
  data: null,
  loading: false,
  error: "",
  done: false,
};
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await $api.post("/auth/login", payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginReset: (state, action) => {
      state.data = null;
      state.error = "";
      state.loading = false;
      state.done = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { meta, payload }) => {
      state.data = payload;
      state.loading = false;
      state.done = true;
    },
    [login.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [login.rejected]: (state, { meta, payload, error }) => {
      state.loading = false;
      state.error = payload;
      state.done = true;
    },
  },
});
export const { loginReset } = loginSlice.actions;
export default loginSlice.reducer;
