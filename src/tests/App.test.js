import React from "react";
import { render, fireEvent } from "@testing-library/react";

import App from "../App";
import RecipeList from "../components/RecipeList";
import LoginForm from "../components/LoginForm";

test("App renders without crashing", () => {
  render(<App />);
});

test("RecipeList renders without crashing", () => {
  const { getByText } = render(<RecipeList />);

  getByText(/ingredients/i);
});

test("LoginForm renders", () => {
  const { getByText } = render(<LoginForm />);

  getByText(/username/i);
});

test("LoginForm renders", () => {
  const { getByText } = render(<LoginForm />);

  const input = getByText(/login/i);
  fireEvent.mouseDown(input);
});
