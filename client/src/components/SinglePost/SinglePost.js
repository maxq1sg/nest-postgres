import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostReset,
  deleteSinglePost,
} from "../../redux/postDeleteReducer";
import { fetchAllPosts } from "../../redux/postListReducer";
import styles from "./single_post.module.css";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();

  const clickRemoveHandler = (e) => {
    const doYouRealyWant = window.confirm("точно?");
    if (doYouRealyWant) {
      dispatch(deletePostReset());
      dispatch(deleteSinglePost(post.id));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.author}>{post?.user?.name}</div>
      <div className={styles.body}>{post.body}</div>
      <div className={styles.close} onClick={clickRemoveHandler}>
        x
      </div>
      <div className={styles.galery}>
        {post.files.map((file) => {
          return (
            <div>
              <img
                className={styles.img}
                src={`http://localhost:4000/uploads/${file.path}`}
                alt="sosi"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePost;
