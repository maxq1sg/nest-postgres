import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./message.css";
import { CSSTransition } from "react-transition-group";

const TextMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { deleted, loading, error } = useSelector((state) => state.deletedPost);
  useEffect(() => {
    if (error || deleted?.deleted) {
      setShowMessage(true);
    }
  }, [loading, error, deleted]);
  useEffect(() => {
    let timerid;
    if (showMessage) {
      timerid = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => {
      console.log("should clear");
      clearTimeout(timerid);
    };
  }, [showMessage]);
  return (
    <>
      <button onClick={() => setShowMessage((prev) => !prev)}>
        нажми меня
      </button>
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="anim"
        unmountOnExit
      >
        <div className="container">Успешно удалено!!!</div>
      </CSSTransition>
    </>
  );
};

export default TextMessage;
