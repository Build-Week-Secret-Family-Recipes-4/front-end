import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import { RecipeContext } from "./contexts/RecipeContext";
import axiosWithAuth from "./components/axiosWithAuth";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/recipes`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
      <RecipeContext.Provider
        value={{ recipes, setRecipes }}
      ></RecipeContext.Provider>
    </div>
  );
}

export default App;
