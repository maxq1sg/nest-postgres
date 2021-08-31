import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

const initialState = {
  newPost: null,
  loading: false,
  error: "",
  done: false,
};
export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await $api.post("/posts/new", payload);
      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

const createPostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPostReset: (state, action) => {
      state.newPost = null;
      state.error = "";
      state.loading = false;
      state.done = false;
    },
  },
  extraReducers: {
    [createNewPost.fulfilled]: (state, { meta, payload }) => {
      state.newPost = payload;
      state.loading = false;
      state.done = true;
    },
    [createNewPost.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [createNewPost.rejected]: (state, { meta, payload, error }) => {
      state.loading = false;
      state.error = error;
      state.done = true;
    },
  },
});
export const { addNewPostReset } = createPostsSlice.actions;
export default createPostsSlice.reducer;
