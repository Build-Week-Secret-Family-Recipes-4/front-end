import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";

import App from "../App";
import RecipeList from "../components/RecipeList";

test("App renders without crashing", () => {
  render(<App />);
});
