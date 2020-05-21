import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

//  username & password


export default function LoginForm() {

    const initialState = {
        username: "",
        password: ""
    };

    const [formState, setFormState] = useState(initialState);
    const [errorState, setErrorState] = useState(initialState);

    // not allowed to submit unless form is complete
    const [buttonDisabled, setButtonDisabled] = useState(true);

    return (
        <form>
          <h3>Login</h3>
            <label htmlFor="username">
                Username:
                <input 
                    type="text"
                    name="username"
                    id="username"
                    value={formState.username}
                    // add on change
                />
            </label>
            <label htmlFor="password">
                Password:
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={formState.password}
                    // onchange
                />
            </label>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )

}