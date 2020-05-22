import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("login: ", username, password);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post("https://secret-recipe-cookbook.herokuapp.com/auth/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/recipelist");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  return (
    <div className="login">
      <h1>Welcome to Secret Family Recipes!</h1>
      <h2>{isLoading ? "...loading" : "Login"}</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
