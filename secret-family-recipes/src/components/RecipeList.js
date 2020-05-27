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
      {recipes.map((recipe) => {
        return (
          <section className="recipe" key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.source}</p>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <p>{recipe.category}</p>
          </section>
        );
      })}
    </div>
  );
};

export default RecipeList;
