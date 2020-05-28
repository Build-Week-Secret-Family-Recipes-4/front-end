import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import styled from "styled-components";

import { RecipeContext } from "../contexts/RecipeContext";
import axiosWithAuth from "./axiosWithAuth";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;
const Button = styled.button`
  border-radius: 5px;
  font-size: 1rem;
  width: 425px;
  margin-top: 20px;
  padding: 10px;
  box-shadow: 7px 7px 10px #888888;

  @media (max-width: 375px) {
    width: 325px;
  }
`;
const Error = styled.p`
  color: red;
  font-size: 0.8rem;
`;
const Recipe = styled.div`
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
  width: 400px;
  border: 1px solid black;

  @media (max-width: 375px) {
    width: 300px;
  }
`;
const TextArea = styled.textarea`
  margin-left: 5px;
  font-size: 1rem;
  border-radius: 5px;
  padding: 10px;
  width: 400px;
  height: 150px;
  resize: none;

  @media (max-width: 375px) {
    width: 300px;
  }
`;

const Dropdown = styled.select`
  width: 425px;
  font-size: 1rem;
  margin: 10px;
  height: 45px;
  background-color: transparent;
  border: 1px solid black;

  @media (max-width: 375px) {
    width: 325px;
  }
`;
const Header = styled.h3`
  font-size: 1.5rem;
`;

const formSchema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  description: yup.string().required("Please enter a description"),
  source: yup.string().required("Please enter a source"),
  ingredients: yup.string().required("Please enter the ingredients"),
  instructions: yup.string().required("Please enter the instructions"),
  category: yup.string().required("Please choose a category"),
});

export default function NewRecipe() {
  const { recipes, setRecipes } = useContext(RecipeContext);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    id: Date.now(),
    description: "",
    source: "",
    ingredients: "",
    instructions: "",
    category: "",
  });

  const [errorState, setErrorState] = useState(newRecipe);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(newRecipe).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [newRecipe]);

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

  const changeHandler = (e) => {
    e.persist();
    validate(e);
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Created New Recipe!");

    axiosWithAuth()
      .get("/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axiosWithAuth()
      .post("/recipes", { ...newRecipe })
      .then((res) => {
        // setNewRecipe(res.data)
        console.log("post: ", res);
      })
      .catch((err) => {
        console.log("post: ", err.message);
      });
  };

  return (
    <Form onSubmit={formSubmit}>
      <Header>New Recipe</Header>
      <Recipe>
        <Fields>
          <label htmlFor="title">
            <TextInput
              type="text"
              name="title"
              id="recipe-title"
              value={newRecipe.title}
              onChange={changeHandler}
              placeholder="Title"
            />
            {errorState.title.length > 0 ? (
              <Error className="error">{errorState.title}</Error>
            ) : null}
          </label>
        </Fields>
        <Fields>
          <label htmlFor="description">
            <TextInput
              type="text"
              name="description"
              id="recipe-description"
              value={newRecipe.description}
              onChange={changeHandler}
              placeholder="Description"
            />
            {errorState.description.length > 0 ? (
              <Error className="error">{errorState.description}</Error>
            ) : null}
          </label>
        </Fields>
        <Fields>
          <label htmlFor="source">
            <TextInput
              type="text"
              name="source"
              id="recipe-source"
              value={newRecipe.source}
              onChange={changeHandler}
              placeholder="Source"
            />
            {errorState.source.length > 0 ? (
              <Error className="error">{errorState.source}</Error>
            ) : null}
          </label>
        </Fields>
        <Fields>
          <label htmlFor="ingredients">
            <TextArea
              name="ingredients"
              id="recipe-ingredients"
              value={newRecipe.ingredients}
              onChange={changeHandler}
              placeholder="What ingredients will you need?"
            />
            {errorState.ingredients.length > 0 ? (
              <Error className="error">{errorState.ingredients}</Error>
            ) : null}
          </label>
        </Fields>
        <Fields>
          <label htmlFor="instructions">
            <TextArea
              name="instructions"
              id="recipe-instructions"
              value={newRecipe.instructions}
              onChange={changeHandler}
              placeholder="Instructions"
            />
            {errorState.instructions.length > 0 ? (
              <Error className="error">{errorState.instructions}</Error>
            ) : null}
          </label>
        </Fields>
        <label htmlFor="category">
          <Dropdown
            name="category"
            id="recipe-category"
            value={newRecipe.category}
            onChange={changeHandler}
          >
            <option value="">Select a category...</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
          </Dropdown>
          {errorState.category.length > 0 ? (
            <Error className="error">{errorState.category}</Error>
          ) : null}
        </label>
      </Recipe>
      <Button disabled={buttonDisabled}>Create New Recipe</Button>
    </Form>
  );
}
