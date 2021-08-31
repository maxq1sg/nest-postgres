import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";
//axios api

const initialState = {
  posts: [],
  loading: false,
  error: "",
  done: false,
};
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $api.get("/posts");
      return data;
    } catch (error) {
      // const message =
      //   error.response && error.response.data.message
      //     ? error.response.data.message
      //     : error.message;
      return rejectWithValue(error.response.data);
      // throw err;
    }
  }
);

const getAllPostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPosts.fulfilled]: (state, { meta, payload }) => {
      //   if (meta.requestId === state.currentRequestId.requestId) {
      state.posts = payload;
      state.loading = false;
      state.done = true;
      //   }
    },
    [fetchAllPosts.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [fetchAllPosts.rejected]: (state, { meta, payload, error }) => {
      state.loading = false;
      state.error = payload;
      state.done = true;
    },
  },
});

export default getAllPostsSlice.reducer;
