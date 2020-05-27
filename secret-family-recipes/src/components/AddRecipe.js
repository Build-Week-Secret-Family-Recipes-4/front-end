import React, { useState, useContext } from "react";

import { RecipeContext } from "../contexts/RecipeContext";
import axiosWithAuth from "./axiosWithAuth";

const AddRecipe = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    id: Date.now(),
    source: "",
    ingredients: "",
    instructions: "",
    category: "",
  });

  const dataRequests = (e) => {
    e.preventDefault();

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
        console.log("post: ", res);
      })
      .catch((err) => {
        console.log("post: ", err);
      });
  };

  const changeHandler = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="new-recipe-form">
      <form onSubmit={dataRequests}></form>
    </section>
  );
};

export default AddRecipe;
