import React, { useContext, useState } from "react";
import styled from "styled-components";

import NewrecipeForm from "./NewRecipeForm";
import axiosWithAuth from "./axiosWithAuth";
import { RecipeContext } from "../contexts/RecipeContext";
import SearchForm from "./SearchForm";

const initialRecipe = {
  title: "",
  id: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "",
};

const RecipeList = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [recipeToEdit, setRecipeToEdit] = useState(initialRecipe);
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const editRecipe = (recipe) => {
    setEditing(true);
    setRecipeToEdit(recipe);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/recipes/${recipeToEdit.id}`, recipeToEdit)
      .then((res) => {
        console.log("put: ", res.data);
      })
      .catch((err) => {
        console.log("put err: ", err.message);
      });
  };

  const deleteRecipe = (recipe) => {
    axiosWithAuth()
      .delete(`/recipes/${recipe.id}`)
      .then((res) => {
        console.log("delete res: ", res);
        setRecipes(recipeToEdit);
        setEditing(false);
      })
      .catch((err) => {
        console.log("delete err: ", err.message);
      });
  };

  console.log("recipes context: ", recipes);
  return (
    <div className="recipes-wrap">
      {/* {searchTerm("") ? <SearchForm /> : <div></div>} */}
      <SearchForm />
      {recipes.map((recipe) => {
        return (
          <div className="info" onClick={() => editRecipe(recipe)}>
            <h3>{recipe.title}</h3>
            <h6>By: {recipe.source}</h6>
            <h6>Ingredients: {recipe.ingredients}</h6>
            <h6>Instructions: {recipe.instructions}</h6>
            <h6>{recipe.category}</h6>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRecipe(recipe);
                }}
              >
                x
              </span>{" "}
              {recipe.recipe}
            </span>
          </div>
        );
      })}
      {editing && (
        <form className="edit-form" onSubmit={saveEdit}>
          <legend>edit recipe</legend>
          <label>
            recipe title:
            <input
              onChange={(e) =>
                setRecipeToEdit({
                  ...recipeToEdit,
                  title: e.target.value,
                })
              }
              value={recipeToEdit.title}
            />
          </label>
          <label>
            recipe source:
            <input
              onChange={(e) =>
                setRecipeToEdit({
                  ...recipeToEdit,
                  source: e.target.value,
                })
              }
              value={recipeToEdit.source}
            />
          </label>
          <label>
            recipe ingredients:
            <input
              onChange={(e) =>
                setRecipeToEdit({
                  ...recipeToEdit,
                  ingredients: e.target.value,
                })
              }
              value={recipeToEdit.ingredients}
            />
          </label>
          <label>
            recipe instructions:
            <input
              onChange={(e) =>
                setRecipeToEdit({
                  ...recipeToEdit,
                  instructions: e.target.value,
                })
              }
              value={recipeToEdit.instructions}
            />
          </label>
          <label>
            recipe category:
            <input
              onChange={(e) =>
                setRecipeToEdit({
                  ...recipeToEdit,
                  category: e.target.value,
                })
              }
              value={recipeToEdit.category}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <NewrecipeForm />
    </div>
  );
};

export default RecipeList;
