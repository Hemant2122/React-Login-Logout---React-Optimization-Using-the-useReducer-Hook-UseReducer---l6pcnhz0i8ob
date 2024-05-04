"use client";
import React, { useReducer } from "react";


// const 

const reducer = (state, action) => {

  switch(action.type) {
    case "USERNAME":
      return{
        ...state,
        username: action.usernameValue,
      };
    break;
    case "PASSWORD":
      return{
        ...state,
        password: action.passwordValue,
      };
    break;
    case "LOGIN":
      return{
        ...state,
        isLoggedIn: true,
      };
    break;
    case "ERROR":
      return{
        ...state,
        error: true,
      };
    break;
    case "LOGOUT":
      return{
        ...state,
        username: "",
        password: "",
        isLoggedIn: false,
        error: false,
      };
    break;

  }
  
};

const DEFAULTSTATE = {
  username: "",
  password: "",
  isLoggedIn: false,
  error: false,
};

function Home() {
  const [state, dispatch] = useReducer(reducer, DEFAULTSTATE);

  console.log(state);

  function submitHandler(event) {
    event.preventDefault();

    if(state.username !== "" && state.password !== ""){
      dispatch({ type: "LOGIN" });
    }else{
      dispatch({ type: "ERROR" });
    }
  }

  return (
    <div id="main">
      {state.isLoggedIn ? (
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className="logout-btn" onClick={() => {
            dispatch({ type: "LOGOUT" });
          }}>
            Logout
          </button>
        </section>
      ) : (
        <form className="login-form" onSubmit={submitHandler}>
          {state.error && (
            <p className="invalid-error">Invalid username or password!</p>
          )}

          <section className="username-input">
            <label>Username: </label>
            <input
              type="text"
              placeholder="Username"
              className="username"
              value={state.username}
              onChange={(e) => {
                dispatch({ type: "USERNAME", usernameValue: e.target.value });
              }}
            />
          </section>

          <section className="password-input">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Password"
              className="password"
              value={state.password}
              onChange={(e) => {
                dispatch({ type: "PASSWORD", passwordValue: e.target.value })
              }}
            />
          </section>
          <button className="login-btn">Login</button>
        </form>
      )}
    </div>
  );
}

export default Home;
