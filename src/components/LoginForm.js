import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  border-radius: 5px;
  font-size: 1rem;
  width: 325px;
  margin-top: 20px;
  padding: 10px;
  box-shadow: 7px 7px 10px #888888;
`;
const Error = styled.p`
  color: red;
  font-size: 0.8rem;
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
`;

const Fields = styled.div`
  padding: 15px;
  font-size: 1rem;
`;
const TextInput = styled.input`
  margin-left: 5px;
  font-size: 1rem;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  border: 1px solid black;
`;

const Header = styled.h3`
  font-size: 1.5rem;
`;

// validation schema
const formSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const history = useHistory();

  const initialState = {
    username: "",
    password: "",
  };

  // States
  const [formState, setFormState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // only allow form submit upon completion of all fields
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // validation
  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({ ...errorState, [e.target.name]: "" });
      })
      .catch((err) => {
        console.log(err.errors);
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  // Change Handler
  const changeHandler = (e) => {
    e.persist();
    validate(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const formSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form Submitted!");

    axios
      .post(
        "https://secret-recipe-cookbook.herokuapp.com/auth/login",
        formState
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        history.push("/recipelist");
        setFormState(initialState);
        console.log("login: ", response.data);
      })
      .catch((err) => console.log(err.message));

    setIsLoading(false);
  };

  return (
    <Form onSubmit={formSubmit}>
      <Header>{isLoading ? "...loading" : "Login"}</Header>
      <Login>
        <Fields>
          <label htmlFor="username">
            <TextInput
              type="text"
              name="username"
              id="username"
              value={formState.username}
              onChange={changeHandler}
              placeholder="Username"
            />
            {errorState.username.length > 0 ? (
              <Error className="error">{errorState.username}</Error>
            ) : null}
          </label>
        </Fields>
        <Fields>
          <label htmlFor="password">
            <TextInput
              type="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={changeHandler}
              placeholder="Password"
            />
            {errorState.password.length > 0 ? (
              <Error className="error">{errorState.password}</Error>
            ) : null}
          </label>
        </Fields>
      </Login>
      <Button disabled={buttonDisabled}>Log In</Button>
    </Form>
  );
};

export default LoginForm;
