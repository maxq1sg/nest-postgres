import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createPostReducer from "./postCreateReducer";
import getAllPostsReducer from "./postListReducer";
import postDeleteRedcuer from "./postDeleteReducer";
import loginReducer from "./loginReducer";

const reducer = combineReducers({
  posts: getAllPostsReducer,
  newPost: createPostReducer,
  deletedPost: postDeleteRedcuer,
  login: loginReducer,
});

export const store = configureStore({ reducer });
