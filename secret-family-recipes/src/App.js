<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import { RecipeContext } from "./contexts/RecipeContext";
import RecipeList from "./components/RecipeList";
import Access from "./components/Access";
import { fetchRecipes } from "./components/fetchRecipes";
=======
import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NewRecipe from "./components/NewRecipeForm";
import SearchForm from './components/SearchForm';
>>>>>>> ff88774b3748d63f772230dfde7711d9de58bd88

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes()
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
<<<<<<< HEAD
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <Route exact path="/" component={Access} />
        <PrivateRoute path="recipelist" component={RecipeList} />
      </RecipeContext.Provider>
=======
      <LoginForm />
      <SignupForm />
      <NewRecipe />
      <SearchForm />
>>>>>>> ff88774b3748d63f772230dfde7711d9de58bd88
    </div>
  );
}

export default App;
