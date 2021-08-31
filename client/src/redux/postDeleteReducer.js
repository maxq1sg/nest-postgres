import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

const initialState = {
  deleted: null,
  loading: false,
  error: "",
  done: false,
};
export const deleteSinglePost = createAsyncThunk(
  "posts/deleteSinglePost",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await $api.delete(`/posts/${payload}`);
      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

const deletePostsSlice = createSlice({
  name: "delete_post",
  initialState,
  reducers: {
    deletePostReset: (state, action) => {
      state.deleted = null;
      state.error = "";
      state.loading = false;
      state.done = false;
    },
  },
  extraReducers: {
    [deleteSinglePost.fulfilled]: (state, { meta, payload }) => {
      state.deleted = payload;
      state.loading = false;
      state.done = true;
    },
    [deleteSinglePost.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [deleteSinglePost.rejected]: (state, { meta, payload, error }) => {
      state.loading = false;
      state.error = error;
      state.done = true;
    },
  },
});
export const { deletePostReset } = deletePostsSlice.actions;
export default deletePostsSlice.reducer;
