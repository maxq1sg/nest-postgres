import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function RouteForAuth({ children, ...rest }) {
  const { data } = useSelector((state) => state.login);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return data ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
