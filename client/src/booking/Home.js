import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/store";
const Home = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const handleClick = () => {
    dispatch(counterActions.increment());
  };

  return (
    <div className="container-fluid h1 p-5 text-center">
      <button className="btn btn-primary" onClick={handleClick}>
        Increment
      </button>
      <h1>{counter}</h1>
    </div>
  );
};

export default Home;
