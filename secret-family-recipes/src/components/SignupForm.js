import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const Button = styled.button`
        border-radius: 5px;
        font-size: 1rem;
        width: 100px;
        margin-top: 20px;
`
const Error = styled.p`
    color: red;
    font-size: .8rem;

`
const Signup = styled.div`
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
    border-radius: 5px;
`


// validation schema
const formSchema = yup.object().shape({
    firstname: yup.string().required("Please enter your first name"),
    lastname: yup.string().required("Please enter your last name"),
    email: yup.string().email("Please enter a valid email address").required("Please enter your email address"),
    username: yup.string().required("Please create a username"),
    password: yup.string().required("Please create a password")
});


export default function SignupForm() {

    const initialState = {
        firstname: "",
        lastname: "",
        email: "",
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
        console.log("Sign Up Form Submitted!");

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
          <h3>Sign Up</h3>
          <Signup>
          <Fields>
            <label htmlFor="firstname">
                First Name:
                <TextInput 
                    type="text"
                    name="firstname"
                    id="signup-firstname"
                    value={formState.firstname}
                    onChange={changeHandler}
                />
                {errorState.firstname.length > 0 ? (<Error className="error">{errorState.firstname}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="lastname">
                Last Name:
                <TextInput 
                    type="text"
                    name="lastname"
                    id="signup-lastname"
                    value={formState.lastname}
                    onChange={changeHandler}
                />
                {errorState.lastname.length > 0 ? (<Error className="error">{errorState.lastname}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="email">
                Email:
                <TextInput 
                    type="text"
                    name="email"
                    id="signup-email"
                    value={formState.email}
                    onChange={changeHandler}
                />
                {errorState.email.length > 0 ? (<Error className="error">{errorState.email}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="username">
                Username:
                <TextInput 
                    type="text"
                    name="username"
                    id="signup-username"
                    value={formState.username}
                    onChange={changeHandler}
                />
                {errorState.username.length > 0 ? (<Error className="error">{errorState.username}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="password">
                Password:
                <TextInput 
                    type="password"
                    name="password"
                    id="signup-password"
                    value={formState.password}
                    onChange={changeHandler}
                />
                {errorState.password.length > 0 ? (<Error className="error">{errorState.password}</Error>) : null}
            </label>
            </Fields>
         </Signup>
            <Button disabled={buttonDisabled}>Sign Up</Button>
        </Form>
    )

}