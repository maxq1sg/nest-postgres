import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createPostReducer from "./postCreateReducer";
import getAllPostsReducer from "./postListReducer";
import postDeleteRedcuer from "./postDeleteReducer";

const reducer = combineReducers({
  posts: getAllPostsReducer,
  newPost: createPostReducer,
  deletedPost: postDeleteRedcuer,
});

export const store = configureStore({ reducer });
