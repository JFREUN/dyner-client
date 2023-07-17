// src/api/service.js
 
import axios from "axios";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)


    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005"


  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};
 
const getRecipes = () => {
  const storedToken = localStorage.getItem('authToken');

  return api.get("/api/recipes", { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((res) => res.data)
    .catch(errorHandler);
};
 
const uploadImage = (file) => {
  const storedToken = localStorage.getItem('authToken');

  return api.post("/api/upload", file, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => res.data)
    .catch(errorHandler);
};
 
const createRecipe = (newRecipe) => {
  const storedToken = localStorage.getItem('authToken');

  return api.post("/api/recipes", newRecipe, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => res.data)
    .catch(errorHandler);
};
 
export default {
  getRecipes,
  uploadImage,
  createRecipe,
};