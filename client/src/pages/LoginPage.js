import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../hooks/useInput";
import { login } from "../redux/loginReducer";
import { writeToLocalStorage } from "../utils/localstorage";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const name = useInput("maxim2");
  const password = useInput("123");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.login);
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ name: name.value, password: password.value }));
  };

  useEffect(() => {
    if (data) {
      writeToLocalStorage("token", data.token);
      history.push(history?.location?.state?.from?.pathname || "/posts");
    }
  }, [data, history]);

  return (
    <>
      {!data && (
        <form onSubmit={submitHandler}>
          <div>
            <input type="text" {...name} placeholder="name" />
          </div>
          <div>
            <input type="text" {...password} placeholder="password" />
          </div>
          <div>
            <button>ВОЙТИ</button>
          </div>
          {error && <h1>{error.message}</h1>}
        </form>
      )}
    </>
  );
};

export default LoginPage;
