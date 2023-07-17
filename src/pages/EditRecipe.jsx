import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import service from "../api/service";
import "../css/styles.css";

const API_URL = process.env.REACT_APP_API_URL || "https://jealous-blue-pocketbook.cyclic.app";

export default function EditRecipe() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cookingTime, setCookingTime] = useState(0);
  const [allIngredients, setAllIngredients] = useState([]);
  const [search, setSearch] = useState([]);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { recipeId } = useParams();
  const storedToken = localStorage.getItem("authToken");


  useEffect(() => {
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        const oneRecipe = response.data;
        setName(oneRecipe.name);
        setIngredients(oneRecipe.ingredients);
        setImageUrl(oneRecipe.imageUrl);
        setInstruction(oneRecipe.instruction);
        setCookingTime(oneRecipe.cookingTime);
      })
      .catch((error) => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search) {
      axios
        .get(`${API_URL}/api/ingredients/search?name=${search}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllIngredients(response.data);
        })
        .catch((err) => console.log("This is a search error:", err));
    }
  },[search,storedToken]);

  const handleFileUpload = (e) => {

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      imageUrl,
      instruction,
      ingredients,
      cookingTime,
      userId: user,
    };

    axios
      .put(`${API_URL}/api/recipes/${recipeId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/recipes/${recipeId}`);
      });
  };

  const deleteRecipe = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };

  const addIngredients = (ingredientId) => {
    const ingredientToAdd = allIngredients.find(
      (ingredient) => ingredient._id === ingredientId
    );
    if (ingredientToAdd) {
      setIngredients([...ingredients, ingredientToAdd]);
    }
  };

  return (
    <div className="recipeDetails">
      <div className="recipeDiv">
        <img className="imageDetail editClass" src={imageUrl} alt="recipe" />
        <form onSubmit={handleFormSubmit} className="recipeContent editClass">
          <h1>{name} </h1>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Image:</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
          <label>Instruction:</label>
          <input
            type="text"
            name="instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          <div className="searchWrapper">
            <label htmlFor="selectIngredients">Selected Ingredients:</label>

            <div
              className="ingredient-list"
              style={{ backgroundColor: "white" }}
            >
              {ingredients.map((ingredient) => (
                <div key={ingredient._id} className="searchDivRecipe">
                  {ingredient.name}
                  <button
                    className="deselectButton"
                    type="button"
                    onClick={() => {
                      const newIngredients = ingredients.filter(
                        (i) => i !== ingredient
                      );
                      setIngredients(newIngredients);
                    }}
                  >
                    Deselect
                  </button>
                </div>
              ))}
            </div>

            <div className="ingredient-search-container">
              <input
                className="addIngredients"
                type="text"
                placeholder="Search and Add Ingredients"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="ingredient-list">
                {allIngredients.map((ingredient, index) => (
                  <div key={index} className="searchDivRecipe">
                    <div className="search-recipe-P">{ingredient.name}</div>

                    <button
                      className="searchButton"
                      style={{ backgroundColor: "#5c8d89", color: "white" }}
                      type="button"
                      onClick={() => addIngredients(ingredient._id)}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group-edit">
            <label>Cooking Time:</label>
            <input
              type="text"
              name="cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
          </div>
          <div className="detailButtons">
            <button type="submit" className="recipebtn">
              Update Recipe
            </button>
            <button className="recipebtn" onClick={deleteRecipe}>
              Delete Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
