import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";

import App from "../App";
import RecipeList from "../components/RecipeList";
import AddRecipe from "../components/AddRecipe";
import Login from "../components/Login";

test("App renders without crashing", () => {
  render(<App />);
});
