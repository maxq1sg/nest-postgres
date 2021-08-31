import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/postListReducer";
import SinglePost from "../SinglePost/SinglePost";
import "./styles.css";

const PostList = () => {
  const { error, posts, loading, done } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const {
    deleted,
    loading: deleteLoading,
    error: errorLoading,
  } = useSelector((state) => state.deletedPost);

  useEffect(() => {
    if (deleted?.deleted) {
      dispatch(fetchAllPosts());
      // console.log(deleted.deleted);
    }
  }, [deleted, dispatch]);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div>
      <div className={`message${!loading || !error ? " hidden" : ""}`}>
        {deleteLoading ? "загрузка" : null}
      </div>

      {loading ? (
        <h1>загрузка....</h1>
      ) : error ? (
        error.message
      ) : posts.length ? (
        posts.map((item) => <SinglePost post={item} />)
      ) : done ? (
        <h1>Список постов пуст!</h1>
      ) : null}
    </div>
  );
};

export default PostList;
