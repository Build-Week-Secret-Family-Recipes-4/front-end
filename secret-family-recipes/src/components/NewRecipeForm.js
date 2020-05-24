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
        border-radius: 5px;
        font-size: 1rem;
        width: 175px;
        margin-top: 20px;
`
const Error = styled.p`
    color: red;
    font-size: .8rem;

`
const Recipe = styled.div`
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
const TextArea = styled.textarea`
    margin-left: 5px;
    font-size: 1rem;
    border-radius: 5px;
`


const formSchema = yup.object().shape({
    title: yup.string().required("Please enter a title"),
    description: yup.string().required("Please enter a description"),
    source: yup.string().required("Please enter a source"),
    ingredients: yup.string().required("Please enter the ingredients") ,
    instructions: yup.string().required("Please enter the instructions"),
    category: yup.string().required("Please enter a category")
})


export default function NewRecipe() {

    const initialState = {
        title: "",
        description: "",
        source: "",
        ingredients: "",
        instructions: "",
        category: ""
    }

    const [formState, setFormState] = useState(initialState);
    const [errorState, setErrorState] = useState(initialState);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => { setButtonDisabled (!valid);});
    }, [formState]);

    const validate = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({...errorState, [e.target.name]: ""});
            })
            .catch(err => {
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    }

    const changeHandler = e => {
        e.persist();
        validate(e);
        setFormState({...formState, [e.target.name]: e.target.value })
    }

    const formSubmit = e => {
        e.preventDefault();
        console.log("Created New Recipe!")

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
            <h3>New Recipe</h3>
            <Recipe>
            <Fields>
            <label htmlFor="title">
                Title:
                <TextInput 
                    type="text"
                    name="title"
                    id="recipe-title"
                    value={formState.title}
                    onChange={changeHandler}
                />
                {errorState.title.length > 0 ? (<Error className="error">{errorState.title}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="description"> 
                Description:
                <TextInput
                    type="text" 
                    name="description"
                    id="recipe-description"
                    value={formState.description}
                    onChange={changeHandler}
                />
                 {errorState.description.length > 0 ? (<Error className="error">{errorState.description}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="source">
                Source:
                <TextInput 
                    type="text"
                    name="source"
                    id="recipe-source"
                    value={formState.source}
                    onChange={changeHandler}
                />
                {errorState.source.length > 0 ? (<Error className="error">{errorState.source}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="ingredients">
                Ingredients:
                <TextArea 
                    name="ingredients"
                    id="recipe-ingredients"
                    value={formState.ingredients}
                    onChange={changeHandler}
                />
                 {errorState.ingredients.length > 0 ? (<Error className="error">{errorState.ingredients}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="instructions">
                Instructions:
                <TextArea
                    name="instructions"
                    id="recipe-instructions"
                    value={formState.instructions}
                    onChange={changeHandler}
                />
                {errorState.instructions.length > 0 ? (<Error className="error">{errorState.instructions}</Error>) : null}
            </label>
            </Fields>
            <Fields>
            <label htmlFor="category">
                Category:
                <TextInput
                    type="text"
                    name="category"
                    id="recipe-category"
                    value={formState.category}
                    onChange={changeHandler}
                />
                {errorState.category.length > 0 ? (<Error className="error">{errorState.category}</Error>) : null}
            </label>
            </Fields>
            </Recipe>
            <Button disabled={buttonDisabled}>Create New Recipe</Button>
        </Form>
    )
}