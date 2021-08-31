import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import RouteForAuth from "./components/RouteForAuth/RouteForAuth";
import AnotherPage from "./pages/AnotherPage";
import ForAll from "./pages/ForAll";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <>
      <nav>
        <NavLink exact to="/login">
          Login
        </NavLink>
        <NavLink exact to="/posts">
          Посты
        </NavLink>
        <NavLink exact to="/another">
          Защищенный
        </NavLink>
        <NavLink exact to="/all">
          All
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/all" component={ForAll} />
        <RouteForAuth exact path="/posts">
          <PostPage />
        </RouteForAuth>
        <RouteForAuth exact path="/another">
          <AnotherPage />
        </RouteForAuth>
      </Switch>
    </>
  );
};

export default App;
