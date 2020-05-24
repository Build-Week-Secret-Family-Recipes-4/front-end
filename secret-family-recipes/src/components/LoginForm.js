import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from 'styled-components';

const Form = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const Button = styled.button`
    border-radius: 2px;
    font-size: 1rem;
    width: 325px;
    margin-top: 20px;
    padding:10px;
    box-shadow: 7px 7px 10px #888888;

`
const Error = styled.p`
    color: red;
    font-size: .8rem;

`
const Login = styled.div`
    display:flex;
    flex-direction: column;
`

const Fields = styled.div`
    padding: 15px;
    font-size: 1rem;
`
const TextInput = styled.input`
    margin-left: 5px;
    font-size: 1rem;
    border-radius: 2px;
    padding: 10px;
    width: 300px;
`

const Header = styled.h3`
    font-size: 1.5rem;
`

// validation schema
const formSchema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password")
});


export default function LoginForm() {

    const initialState = {
        username: "",
        password: ""
    };


    // States
    const [formState, setFormState] = useState(initialState);
    const [errorState, setErrorState] = useState(initialState);


    // only allow form submit upon completion of all fields
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    useEffect(() => {
     formSchema.isValid(formState).then(valid => { setButtonDisabled(!valid);});
        }, [formState]);


     // validation
    const validate = e => {
            yup
                .reach(formSchema, e.target.name)
                .validate(e.target.value)
                .then(valid => {
                    setErrorState({...errorState, [e.target.name]: ""
                    });
                })
                .catch(err => {
                    console.log(err.errors);
                    setErrorState({
                        ...errorState,
                        [e.target.name]: err.errors[0]
                    });
                });
    
        }

    // Change Handler
    const changeHandler = e => {
        e.persist();
        validate(e);
        setFormState({...formState, [e.target.name]: e.target.value })
    }

    // Submit Handler
    const formSubmit = e => {
        e.preventDefault();
        console.log("Form Submitted!");

        // axios call to dummy API so I could see if my validation worked
        axios
             .post("https://reqres.in/api/users", formState)
             .then((response) => {
                setFormState(initialState);
                console.log(response);

        })
        .catch((err) => console.log(err.response));
    }


    return (
        <Form onSubmit={formSubmit}>
          <Header>Login</Header>
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
                {errorState.username.length > 0 ? (<Error className="error">{errorState.username}</Error>) : null}
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
                {errorState.password.length > 0 ? (<Error className="error">{errorState.password}</Error>) : null}
            </label>
            </Fields>
          </Login>
            <Button disabled={buttonDisabled}>Sign In</Button>
        </Form>
    )

}