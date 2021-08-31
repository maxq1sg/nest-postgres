import React from "react";
import Input from "../components/Input/Input";
import PostList from "../components/PostList/PostList";
import TextMessage from "../components/TextMessage/TextMessage";

const PostPage = () => {
  return (
    <>
      <Input />
      <PostList />
      <TextMessage />
    </>
  );
};

export default PostPage;
