import axios from "axios";

const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://secret-recipe-cookbook.herokuapp.com/",
    headers: { authorization: localStorage.getItem("token") },
  });
};

export default axiosWithAuth;
