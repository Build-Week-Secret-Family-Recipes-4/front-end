import React, { useContext } from "react";

import { RecipeContext } from "../contexts/RecipeContext";

const RecipeList = () => {
  const { recipes } = useContext(RecipeContext);

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
