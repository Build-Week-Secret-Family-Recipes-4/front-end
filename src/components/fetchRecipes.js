import axios from "axios";

export const fetchRecipes = () => {
  return axios
    .get(`https://secret-recipe-cookbook.herokuapp.com/recipes`)
    .then((res) => {
      return res;
    });
};
