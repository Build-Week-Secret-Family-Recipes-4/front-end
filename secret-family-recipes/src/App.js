import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import { RecipeContext } from "./contexts/RecipeContext";
import axiosWithAuth from "./components/axiosWithAuth";
import RecipeList from "./components/RecipeList";
import Login from "./components/Login";

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
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="recipelist" component={RecipeList} />
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
