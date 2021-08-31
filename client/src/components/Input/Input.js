import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPostReset, createNewPost } from "../../redux/postCreateReducer";
import { fetchAllPosts } from "../../redux/postListReducer";
import FileUpload from "../FileUpload/FileUpload";
import styles from "./input.module.css";

const Input = () => {
  const [files, setFiles] = useState([]);
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const { newPost, error, loading } = useSelector((state) => state.newPost);
  useEffect(() => {
    if (newPost) {
      dispatch(fetchAllPosts());
    }
  }, [newPost,dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewPostReset());
    const formData = new FormData();
    formData.append("body", body);
    formData.append("user_id", 10);
    for (let index = 0; index < files.length; index++) {
      formData.append("files", files[index]);
    }
    dispatch(createNewPost(formData));
  };
  return (
    <form onSubmit={submitHandler}>
      <textarea
        className={styles.input}
        name="body"
        placeholder="Введите текст поста"
        rows={5}
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <button>{loading ? "ЗАГРУЗКА..." : "ДОБАВИТЬ"}</button>
      <FileUpload accept="image/*" setFiles={setFiles}>
        <div className={styles.file}>ЗАГРУЗИТЬ</div>
        <div>
          {files.length > 0
            ? // ?
              Array.from(files).map((file) => <div>{file.name}</div>)
            : "empty"}
        </div>
      </FileUpload>
    </form>
  );
};

export default Input;
