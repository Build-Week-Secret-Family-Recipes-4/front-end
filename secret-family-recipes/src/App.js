import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NewRecipe from "./components/NewRecipeForm";
import SearchForm from './components/SearchForm';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <SignupForm />
      <NewRecipe />
      <SearchForm />
    </div>
  );
}

export default App;
