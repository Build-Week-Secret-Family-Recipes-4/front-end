import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NewRecipe from "./components/NewRecipeForm";

function App() {
  return (
    <div className="App">
      <LoginForm />
      <SignupForm />
      <NewRecipe />
      
    </div>
  );
}

export default App;
