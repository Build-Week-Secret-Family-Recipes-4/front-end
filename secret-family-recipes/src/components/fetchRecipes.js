import axiosWithAuth from "./axiosWithAuth";

export const fetchRecipes = () => {
  return axiosWithAuth()
    .get(`/recipes`)
    .then((res) => {
      return res;
    });
};
