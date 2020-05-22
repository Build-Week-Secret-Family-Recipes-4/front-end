import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";



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
    const formSubmit = (e) => {
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
        <form onSubmit={formSubmit}>
          <h3>Login</h3>
            <label htmlFor="username">
                Username:
                <input 
                    type="text"
                    name="username"
                    id="username"
                    value={formState.username}
                    onChange={changeHandler}
                />
                {errorState.username.length > 0 ? (<p className="error">{errorState.username}</p>) : null}
            </label>
            <label htmlFor="password">
                Password:
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={formState.password}
                    onChange={changeHandler}
                />
                {errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>) : null}
            </label>
            
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )

}