import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import { RecipeContext } from "./contexts/RecipeContext";
import RecipeList from "./components/RecipeList";
import Access from "./components/Access";
import { fetchRecipes } from "./components/fetchRecipes";

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
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <Switch>
          <Route exact path="/" component={Access} />
          <PrivateRoute path="/recipelist" component={RecipeList} />
        </Switch>
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
