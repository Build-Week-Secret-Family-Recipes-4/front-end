import React, { useContext, useState } from "react";

import axiosWithAuth from "./axiosWithAuth";
import { RecipeContext } from "../contexts/RecipeContext";

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

  const editRecipe = (recipe) => {
    setEditing(true);
    setRecipeToEdit(recipe);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/recipes/${recipeToEdit.id}`, recipeToEdit)
      .then((res) => {
        console.log("put: ", res);
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

  return (
    <div className="recipe-card">
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => editRecipe(recipe)}>
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
              {recipe.id}
            </span>
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
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
        </form>
      )}
    </div>
  );
};

export default RecipeList;
